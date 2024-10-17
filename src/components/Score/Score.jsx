import React from 'react';
import {AppCtx, StoreCtx} from 'contexts';
import {Percentage, PersonalizedSlide} from './components';
import {cssSharedClasses} from 'components';
import classnames from 'clsx';
import {manageTransition} from 'misc/utils';
import {quizContent} from 'types';

export const Score = ({quizContent: {media, title, subtitle, scorePerso}, ...props}) => {
    const {state, dispatch} = React.useContext(StoreCtx);

    const sharedClasses = cssSharedClasses(props);
    const {isTransitionEnabled, transitionTimeout} = React.useContext(AppCtx);
    const personalizedResultId = scorePerso?.uuid;

    const {
        currentSlide,
        scoreId
    } = state;

    const show = currentSlide === scoreId;

    const onClick = () => {
        manageTransition({
            isTransitionEnabled,
            transitionTimeout,
            dispatch,
            payload: {
                case: 'RESET'
            }
        });
    };

    return (
        <div className={classnames(
            sharedClasses.item,
            sharedClasses.showOverlay,
            (show ? 'active' : '')
        )}
        >
            {personalizedResultId &&
                <PersonalizedSlide personalizedResultId={personalizedResultId} quizContent={{title, subtitle, media}} onClick={onClick}/>}
            {!personalizedResultId &&
                <Percentage media={media} title={title} subtitle={subtitle} onClick={onClick}/>}
        </div>
    );
};

Score.propTypes = {
    quizContent
};
