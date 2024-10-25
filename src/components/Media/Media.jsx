import React from 'react';
import PropTypes from 'prop-types';
import {JahiaCtx} from 'contexts';
import {WidenAsset} from 'components/Media/components/widen';
import {JahiaAsset} from 'components/Media/components/jahia';
import {CloudinaryAsset} from 'components/Media/components/cloudinary';
import {mediaShape} from 'types';

export const Media = ({id, types, path, sourceID, alt}) => {
    const {cndTypes} = React.useContext(JahiaCtx);
    const width = '1024'; // Default background image size used by cloudy and widen

    switch (true) {
        case types.includes(cndTypes.WIDEN):
            return <WidenAsset types={types} id={id} width={width} sourceID={sourceID}/>;

        case types.includes(cndTypes.CLOUDINARY):
            return <CloudinaryAsset types={types} id={id} width={width} sourceID={sourceID}/>;

        default:
            return <JahiaAsset id={id} types={types} path={path} sourceID={sourceID} alt={alt}/>;
    }
};

Media.propTypes = {
    ...mediaShape,
    sourceID: PropTypes.string,
    alt: PropTypes.string
};
