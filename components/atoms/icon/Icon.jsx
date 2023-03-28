import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ id, color = '#000000', size = '24', ...delegated }) {
    console.log({ id });
    return (
        <svg width={size} height={size} {...delegated}>
            <use fill={color} width={size} height={size} xlinkHref={`/svgs/sprite.svg#${id}`} />
        </svg>
    );
}

Icon.propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
};