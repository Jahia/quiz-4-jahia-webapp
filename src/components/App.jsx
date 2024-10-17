import React from 'react';
import {JahiaCtx, StoreCtx} from '../contexts';
import {Grid, Typography, makeStyles, ThemeProvider} from '@material-ui/core';
import {Quiz, Warmup, Transition, Score, Header, Qna, ContentPerso, Preview, theme} from 'components';
import classnames from 'clsx';

import 'react-circular-progressbar/dist/styles.css';
import {useTranslation} from 'react-i18next';
import {quizData} from 'types';

const useStyles = makeStyles(() => ({
    main: {
        paddingTop: '108px', // ${theme.geometry.header.heights.min}
        marginTop: '-108px',
        position: 'relative',
        '& *, &::after, &::before': {
            boxSizing: 'border-box'
        }

        // ".showResult &"  :{
        //     paddingTop:`108px`//${theme.geometry.header.heights.max}
        // }
    }
}));

export const App = ({quizData: {id, quizContent, quizConfig}, ...props}) => {
    const {t} = useTranslation();
    const classes = useStyles(props);
    const {cndTypes, previewTarget} = React.useContext(JahiaCtx);

    const {state} = React.useContext(StoreCtx);
    const {
        currentSlide,
        showResult,
        showScore,
        persoWasDone
    } = state;

    const displayScore = () => {
        if (showScore) {
            return <Score {...quizContent}/>;
        }
    };

    const displayPerso = persoId => {
        if ((currentSlide === persoId) || persoWasDone.includes(persoId)) {
            return (
                <ContentPerso
                    key={persoId}
                    id={persoId}
                    media={quizContent.media}
                />
            );
        }
    };

    return (
        <ThemeProvider theme={theme(quizConfig?.userTheme)}>
            <Grid container spacing={3}>
                <Grid item
                      xs
                      style={{margin: 'auto', position: 'relative'}}
                      className={classnames((showResult ? 'showResult' : ''))}
                >
                    <Header/>
                    <div className={classnames(
                    classes.main
                    // (showResult?'showResult':'')
                )}
                    >
                        <Transition/>
                        {Boolean(previewTarget) && <Preview {...{previewTarget, quizContent}}/>}

                        {!previewTarget &&
                        <>
                            <Quiz id={id} {...quizContent}/>

                            {quizContent.childNodes.map(node => {
                                if (node.types.includes(cndTypes.QNA)) {
                                    return (
                                        <Qna
                                            key={node.id}
                                            id={node.id}
                                        />
                                    );
                                }

                                if (node.types.includes(cndTypes.WARMUP)) {
                                    return (
                                        <Warmup
                                            key={node.id}
                                            id={node.id}
                                        />
                                    );
                                }

                                if (cndTypes.CONTENT_PERSO.some(type => node.types.includes(type))) {
                                    return displayPerso(node.id);
                                }

                                return (
                                    <Typography
                                        key={node.id}
                                        color="error"
                                        component="p"
                                    >
                                        {t('error.nodeType.notSupported')} : {node.type}
                                    </Typography>
                                );
                            })}

                            {displayScore()}
                        </>}
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

App.propTypes = {
    quizData
};
