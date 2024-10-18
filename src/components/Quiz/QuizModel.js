import {getCoreProps, getMediaProps} from 'misc/utils';
import {cndTypes} from 'douane/lib/config';
import DOMPurify from 'dompurify';

const getTheme = theme => {
    if (typeof theme === 'string') {
        try {
            return JSON.parse(theme);
        } catch (e) {
            console.error('the user theme => \n' + theme + '\n => is not a json object : ', e);
        }
    }

    return theme;
};

const getMktoConfig = config => {
    if (!config) {
        return;
    }

    if (typeof config === 'string') {
        try {
            return JSON.parse(config);
        } catch (e) {
            console.error('the marketo config => \n' + config + '\n => is not a json object : ', e);
        }
    }
};

const languageBundleKeys = [
    'btnStart',
    'btnSubmit',
    'btnQuestion',
    'btnNextQuestion',
    'btnShowResults',
    'btnReset',
    'consentTitle',
    'correctAnswer',
    'wrongAnswer'
];

const initLanguageBundle = quizJcrProps =>
    languageBundleKeys.reduce((bundle, key) => {
        bundle[key] = quizJcrProps[key]?.value;
        return bundle;
    }, {});

const removePersoResult = childNodes =>
    childNodes?.filter(
        ({primaryNodeType: {name}}) => name !== cndTypes.SCORE_PERSO
    )?.map(node => getCoreProps({
        node
    })
    ) || [];

export const formatQuizJcrProps = quizJcrProps => ({
    // NOTE be sure string value like "false" or "true" are boolean I use JSON.parse to cast
    core: getCoreProps({
        node: quizJcrProps
    }),
    content: {
        quizKey: quizJcrProps.quizKey.value,
        title: quizJcrProps.title,
        subtitle: quizJcrProps.subtitle?.value || '',
        description: DOMPurify.sanitize(quizJcrProps.description?.value || '', {ADD_ATTR: ['target']}),
        duration: quizJcrProps.duration?.value || '',
        media: getMediaProps({
            node: quizJcrProps.media?.node
        }),
        childNodes: removePersoResult(quizJcrProps.children?.nodes),
        scorePerso: quizJcrProps.children?.nodes?.find(({primaryNodeType: {name}}) => name === cndTypes.SCORE_PERSO),
        mktgForm: quizJcrProps.mktgForm?.value,
        mktoConfig: getMktoConfig(quizJcrProps.mktoConfig?.value)
    },
    config: {
        userTheme: getTheme(quizJcrProps.userTheme?.value || {}),
        transitionLabel: quizJcrProps.transitionLabel?.value || '',
        isTransitionEnabled: JSON.parse(quizJcrProps.transition?.value || false),
        isResetEnabled: JSON.parse(quizJcrProps.reset?.value || false),
        isBrowsingEnabled: JSON.parse(quizJcrProps.browsing?.value || false)
    },
    languageBundle: initLanguageBundle(quizJcrProps)
});
