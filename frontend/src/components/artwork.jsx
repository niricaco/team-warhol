import React, { useState, useEffect } from "react";
import http from "axios";
import heart from "./style/img/heart.png";
import bin from "./style/img/bin.png";
import {backend_source} from "./API"

const Artwork = (props) => {
  const [style, setStyle] = useState("artwork");
  const [toShow, setToShow] = useState("hidden");
  const [validSessionId, setValidSessionId] = useState(undefined);
  
  const backend = backend_source();

  const doNotShowCardDesc = () => {
    setStyle("artwork hidden");
  };

  const addPhoto = async (title, index, image, creator, date, desc, funfact) => {
    try {
      //console.log(image);
      await http.post(
        `${backend}/api/save`,
        
        {
          title: title,
          index: index, 
          url: image,
          creator: creator,
          date: date,
          desc: desc,
          funfact: funfact

        },
        {
          headers: {
            authorization: localStorage.getItem("sessionId"),
          },
        }
      );
      //console.log("DONE!!!");
      setMessage("Thank you, your item has been successfully added!");
      return;
    } catch (err) {
      if (err.response.status === 401) {
        setMessage("Session ended, please login again!");
        return;
      }
      setMessage("Oops... Something went wrong");
      return;
    }
  };

  const removePhoto = async (index) => {
    /* try {
      await http.delete(
        "http://localhost:4000/api/modifyCollection",
        {
          index: index, 
        },
        {
          headers: {
            authorization: localStorage.getItem("sessionId"),
          },
        }
      );
      console.log("DONE!!!");
      setMessage("Thank you, your item has been successfully removed!");
      return;
    } catch (err) {
      /*if (err.response.status === 401) {
        setMessage("Session ended, please login again!");
        return;
      }
      setMessage("Oops... Something went wrong");
      return;
    }*/
  };

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
        setValidSessionId(localStorage.getItem("sessionId"));
    }
  }, [validSessionId]);

  //console.log(validSessionId);

  const { title, index, image, creator, date, desc, funfact, setMessage, alreadySaved } = props;
  
  return (
    <main>
    <div className="grid_item" key={index}>
      <div className="card">
      {alreadySaved === false ?
          <img
            className="like"
            src={heart}
            alt="like"
            hidden={validSessionId === undefined ? true : false}
            onClick={() => addPhoto(title, index, image, creator, date, desc, funfact)}
          ></img>
        :
          <img
            className="like"
            src={bin}
            alt="unlike"
            hidden={validSessionId === undefined ? true : false}
            onClick={() => removePhoto(index)}
          ></img>
      }
        <img className="card_img" src={image} alt=""></img>

        <div className="card_content center">
          <h1 className="card_header">{title}</h1>
          <p className="card_text">{creator}</p>
          <button className="popupButton " onClick={() => setToShow("show")}>
            More info <span>&rarr;</span>
          </button>
        </div>

        
        <div className={toShow} key={title} onClick={() => setToShow("hidden")}>
          <div className="artworkBlocker">
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
              {alreadySaved === false ?
                 <button
                  id="saveButton"
                  disabled={validSessionId === undefined ? true : false}
                  className="serviceButtons "
                  onClick={() => addPhoto(title, index, image, creator, date, desc, funfact)}
                >Save</button>
              : 
              <button
                  id="removeButton"
                  disabled={validSessionId === undefined ? true : false}
                  className="serviceButtons "
                  onClick={() => removePhoto(index)}
                >Remove from collection</button>
              }
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
    </main>
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
