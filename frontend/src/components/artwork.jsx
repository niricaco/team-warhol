import React, { useState } from "react";

const Artwork = (props) => {
  
  const [style, setStyle] = useState("artwork");
  const [toShow, setToShow] = useState("hidden");

  const doNotShowCardDesc = () => {
    setStyle("artwork hidden");
  };

  const { title, index, image, creator, date, desc, funfact } = props;
  return (
  
      <div className="grid_item" key={index}>
              <div className="card">
                <img
                  className="card_img"
                  src={image}
                  alt=""
                ></img>

                <div className="card_content center">
                  <h1 className="card_header">{title}</h1>
                  <p className="card_text">{creator}</p>
                  <button className="serviceButtons " onClick={() => setToShow("show")}>
                    More info <span>&rarr;</span>
                  </button>
                </div>
                <div className={toShow} key={title} onClick={() => setToShow("hidden")}>
                  <div className="artwork">
                    <div className="art_image">
                      <img src={image} alt="" />
                    </div>
                    <div className="art_desc">
                      <h1>{title}</h1>
                      <h3>{creator}</h3>
                      <p>{desc}</p>
                      <p>{funfact}</p>
                      <h5>Creation year: {date}</h5>
                      <button className="serviceButtons " onClick={() => setToShow("hidden")}>Back</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
  );

};

export default Artwork;
