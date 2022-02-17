import React, { useState } from "react";

const Artwork = (props) => {
  const [style, setStyle] = useState("artwork");
  const showCardDesc = () => {
    setStyle("artwork");
  };
  const doNotShowCardDesc = () => {
    setStyle("artwork hidden");
  };

  const { name, image, species, status, gender, origin } = props;
  return (
    <>
      <div className="artwork">
        <div className="art_image">
          <img src={item.images.web.url} alt="" />
        </div>
        <div className="art_desc">
          <h1>{item.title}</h1>
          <h3>{item.creators[0].description}</h3>
          <p>{item.wall_description}</p>
          <p>{item.fun_fact}</p>
          <h5>Creation year: {item.creation_date}</h5>
          <button onClick={doNotShowCardDesc}>Back...</button>
        </div>
      </div>
    </>
  );
};

export default Artwork;
