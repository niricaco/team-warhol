import React, { useState, useEffect } from "react";
import http from "axios";
import heart from "./style/img/heart.png";

const Artwork = (props) => {
  const [style, setStyle] = useState("artwork");
  const [toShow, setToShow] = useState("hidden");
  const [validSessionId, setValidSessionId] = useState(undefined);

  const doNotShowCardDesc = () => {
    setStyle("artwork hidden");
  };

  const addPhoto = async (title, index, image, creator, date, desc, funfact) => {
    try {
      console.log(image);
      await http.post(
        "http://localhost:4000/api/save",
        
        {
          title: title,
          index: index, 
          url: image,
          creator: creator,
          date: date,
          desc: desc,
          funfact: funfact

          /*
          title={item.title}
          index={item.accession_number}
          image={item.images.web.url}
          creator={
            item.creators.length > 0
              ? item.creators[0].description
              : "Creator unknown"
          }
          date={item.creation_date}
          desc={item.wall_description}
          funfact={item.fun_fact}
          */
        },
        {
          headers: {
            authorization: localStorage.getItem("sessionId"),
          },
        }
      );
      return <div>Thank you, your item has been successfully added!</div>;
    } catch (err) {
      if (err.response.status === 401) {
        return <div>Session ended, please login again!</div>;
      }
      return <div>Oops... Something went wrong</div>;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      setValidSessionId(localStorage.getItem("sessionId"));
    }
  }, [validSessionId]);

  //console.log(validSessionId);

  const { title, index, image, creator, date, desc, funfact } = props;
  return (
    <div className="grid_item" key={index}>
      <div className="card">
        <img
          className="like"
          src={heart}
          alt="like"
          hidden={validSessionId === undefined ? true : false}
          onClick={() => addPhoto(title, index, image, creator, date, desc, funfact)}
        ></img>
        <img className="card_img" src={image} alt=""></img>

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
              <p className="desc">{desc}</p>
              <p className="funfact">{funfact}</p>
              <h5>Creation year: {date}</h5>
              <button
                className="serviceButtons "
                onClick={() => setToShow("hidden")}
              >
                Back
              </button>
              <button
                id="saveButton"
                disabled={validSessionId === undefined ? true : false}
                className="serviceButtons "
                onClick={() => addPhoto(title, index, image, creator, date, desc, funfact)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artwork;

/*
 const { title, index, image, creator, date, desc, funfact} = props;
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
                  <button className="serviceButtons "
                  onClick={() => {
                      setToShow("show");
                      setDisable(true);
                  }
                  }>
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
              
              */
