import React, { useState } from "react";

const Artwork = (props) => {
  /* const [style, setStyle] = useState("card-desc"); */

  /*   const showCardDesc = () => {
    setStyle("card-desc-show");
  };
  const doNotShowCardDesc = () => {
    setStyle("card-desc");
  }; */

  const { id, title } = props;
  return (
    <>
      <div key={id} className="card">
        <div className="card-title">
          <h5>{title}</h5>
        </div>
        {/*         <img
          className="charImg"
          src={thumbnail}
          onClick={showCardDesc}
          alt="Artwork"
        ></img> */}
        {/* <div className={style} onClick={doNotShowCardDesc}>
          <p className="charName">{name}</p>
          <p className="charInfo">
            <b>Species:</b> {species}
          </p>
          <p className="charInfo">
            <b>Gender:</b> {gender};
          </p>
          <p className="charInfo">
            <b>Status:</b> {status};
          </p>
          <p className="charInfo">
            <b>Origin:</b> {origin};
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Artwork;
