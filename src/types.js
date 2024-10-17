import PropTypes from 'prop-types';

// Define reusable PropTypes shapes
export const jcrNode = PropTypes.shape({
    workspace: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    primaryNodeType: PropTypes.shape({
        name: PropTypes.string.isRequired,
        supertypes: PropTypes.shape({name: PropTypes.string.isRequired})
    }),
    mixinTypes: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string.isRequired})),
    site: PropTypes.shape({
        workspace: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired
    })
});

export const previewTarget = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
});

export const childNode = PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired
});

export const media = PropTypes.shape({
    id: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired
});

export const quizContent = PropTypes.shape({
    quizKey: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string.isRequired,
    media,
    childNodes: PropTypes.arrayOf(childNode),
    scorePerso: PropTypes.arrayOf(jcrNode),
    mktgForm: PropTypes.string,
    mktoConfig: PropTypes.object
});

export const quizConfig = PropTypes.shape({
    userTheme: PropTypes.object,
    transitionLabel: PropTypes.string,
    isTransitionEnabled: PropTypes.bool,
    isResetEnabled: PropTypes.bool,
    isBrowsingEnabled: PropTypes.bool
});

export const quizData = PropTypes.shape({
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    quizContent,
    quizConfig,
    languageBundle: PropTypes.object
});
