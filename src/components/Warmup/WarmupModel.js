import {getCoreProps, getMediaProps} from 'misc/utils';
import DOMPurify from 'dompurify';

export const formatWarmupJcrProps = warmupJcrProps => {
    return {
        id: warmupJcrProps.uuid,
        title: warmupJcrProps.title,
        subtitle: warmupJcrProps.subtitle?.value || '',
        content: DOMPurify.sanitize(warmupJcrProps.content?.value || '', {ADD_ATTR: ['target']}),
        duration: warmupJcrProps.duration?.value || '',
        media: getMediaProps({
            node: warmupJcrProps.media?.node
        }),
        video: getCoreProps({
            node: warmupJcrProps.video?.node,
            path: warmupJcrProps.video?.value
        }),
        childNodes: warmupJcrProps.children?.nodes?.map(node =>
            getCoreProps({node})
        ) || []
    };
};
