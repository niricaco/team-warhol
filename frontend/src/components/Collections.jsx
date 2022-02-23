import React, { useEffect, useState } from "react";
import "./style/artworks.css";
import "./style/pagination.css";
import http from "axios";

const Collections = (props) => {
  const loggedIn = props.loggedIn;
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const setMessage = props.setMessage;
  setMessage("");

  const getCollection = async () => {
    try {
      const response = await http.get(
        "http://localhost:4000/api/getCollection",
        {
          headers: {
            authorization: localStorage.getItem("sessionId"),
          },
        }
      );
      setCollection(response.data);
      console.log(response);
      //setMessage("Successful photos loading!");
      setLoading(false);
    } catch (err) {
      setMessage("Unauthorized user, sorry, please login again!");
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <>
      {!loggedIn && <h2>You are not logged in, please login</h2>}
      {loading && (
        <h2 className="loading">Please wait, the gallery is loading...</h2>
      )}
      {!loading && collection.map((pic, index) => {
        return <img src={pic} alt="" key={index} />
      })  
      }
    </>
  );
};

export default Collections;
