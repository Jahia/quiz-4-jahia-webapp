import React from 'react';
import PropTypes from 'prop-types';

export const CloudinaryImage = ({baseUrl, endUrl, title}) => {
    const urlParams = 'f_auto,w_1024';

    return (
        <img className="d-block w-100"
             src={`${baseUrl}/${urlParams}/${endUrl}`}
             alt={title}/>
    );
};

CloudinaryImage.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    endUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};
