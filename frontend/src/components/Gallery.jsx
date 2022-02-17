import React from 'react';

const Gallery = (props) => {
    const { image } = props;
    return (
        <div className="responsiveItem">
            <img className="respImage" src={image} alt=''></img>
        </div>
    );
}

export default Gallery