import React, { useEffect, useState } from "react";
import "./style/artworks.css";
import "./style/pagination.css";
import http from "axios";

const Collections = (props) => {
  const loggedIn = props.loggedIn;
  const [loading, setLoading] = useState(true);
  const setMessage = props.setMessage;
  setMessage("");

  const getCollection = async () => {
    try {
      const response = await http.get(
        "https://warhol-frontend-backend.sloppy.zone/api/getCollection",
        {},
        {
          headers: {
            authorization: localStorage.getItem("sessionID"),
          },
        }
      );

      //console.log(response);
      setMessage("Successful photos loading!");

      setLoading(false);
    } catch (err) {
      setMessage("Wrong email or password");
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
    </>
  );
};

export default Collections;
