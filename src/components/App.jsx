import React from 'react';
import {JahiaCtx, StoreCtx, AppCtx} from '../contexts';
import {Grid, Typography, makeStyles, ThemeProvider} from '@material-ui/core';
import {Quiz, Warmup, Transition, Score, Header, Qna, ContentPerso, Preview, theme} from 'components';
import classnames from 'clsx';

import 'react-circular-progressbar/dist/styles.css';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(() => ({
    main: {
        paddingTop: '100px', // `${theme.geometry.header.heights.max}px` cannot use theme, theme is undefined
        marginTop: '-100px',
        position: 'relative',
        '& *, &::after, &::before': {
            boxSizing: 'border-box'
        }

        // ".showResult &"  :{
        //     paddingTop:`108px`//${theme.geometry.header.heights.max}
        // }
    }
}));

export const App = props => {
    const {t} = useTranslation();
    const classes = useStyles(props);
    const {cndTypes, previewTarget} = React.useContext(JahiaCtx);
    const {content: quizContent, config: quizConfig} = React.useContext(AppCtx);

    const {state} = React.useContext(StoreCtx);
    const {
        currentSlide,
        showResult,
        showScore,
        persoWasDone
    } = state;

    const displayScore = () => {
        if (showScore) {
            return <Score/>;
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
                        {Boolean(previewTarget) && <Preview {...{previewTarget, media: quizContent.media}}/>}

                        {!previewTarget &&
                        <>
                            <Quiz/>

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

// App.propTypes = {
//     quizData
// };
