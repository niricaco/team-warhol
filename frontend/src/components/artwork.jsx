import React, { useState } from "react";
import "./artwork.css";

const Artwork = (props) => {
  const {key, title, creator, img, funfact, date, desc } = props.params[0];
  
  return (
    <>
      <h1>Title: {title}</h1>
      <div key={key} className="artwork">
        <div className="art_image">
          <img src={img} alt="" />
        </div>
        <div className="art_desc">
          <h3>Creator name: {creator}</h3>
          <h3>Creation year: {date}</h3>
          <p>{desc}</p>
          <p>{funfact}</p>
          <button onClick={() => window.location.reload()}>Back...</button>
        </div>
      </div>
    </>
  );
};

export default Artwork;
