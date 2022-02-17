import React, { useState } from "react";
import "./style/artwork.css";

const Artwork = (props) => {
  const {key, title, creator, img, funfact, date, desc } = props.params[0];
  
  return (
    <>

      <div key={key} className="artwork">
        <div className="art_image">
          <img src={img} alt="" />
        </div>
        <div className="art_desc">
          <h1>{title}</h1>
          <h3>{creator}</h3>
          <p>{desc}</p>
          <p>{funfact}</p>
          <h5>Creation year: {date}</h5>
          <button onClick={() => window.location.reload()}>Back...</button>
        </div>
      </div>
    </>
  );
};

export default Artwork;
