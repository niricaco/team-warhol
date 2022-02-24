import React, { useEffect, useState } from "react";
import "./style/artworks.css";
import "./style/pagination.css";
import http from "axios";
import Artwork from "./artwork";
import { backend_source } from "./API";

const Collections = (props) => {
  const backend = backend_source();
  const loggedIn = props.loggedIn;
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const setMessage = props.setMessage;
  setMessage("");

  const getCollection = async () => {
    try {
      const response = await http.get(`${backend}/api/getCollection`, {
        headers: {
          authorization: localStorage.getItem("sessionId"),
        },
      });
      setCollection(response.data);
      //console.log(response.data);
      setMessage("Action is done!");
      setLoading(false);
    } catch (err) {
      setMessage("Unauthorized user, sorry, please login again!");
    }
  };

  useEffect(() => {
    getCollection();
  }, [collection]);

  return (
    <>
      {!loggedIn && <h2>You are not logged in, please login</h2>}
      {loading && (
        <h2 className="loading">Please wait, the gallery is loading...</h2>
      )}
      <div className="grid">
        {!loading &&
          collection.map((pic) => {
            return (
              <Artwork
                key={pic.index}
                title={pic.title}
                index={pic.index}
                image={pic.url}
                creator={pic.creator}
                date={pic.date}
                desc={pic.desc}
                funfact={pic.funfact}
                setMessage={setMessage}
                alreadySaved={true}
              />
            );
          })}
      </div>
    </>
  );
};

export default Collections;
