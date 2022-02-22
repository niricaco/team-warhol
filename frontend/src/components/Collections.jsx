import React, { useEffect, useState } from "react";
import "./style/artworks.css";
import "./style/pagination.css";
import http from 'axios';

const Collections = (props) => {
    const loggedIn = props.loggedIn;
    const [loading, setLoading] = useState(true);

    const getCollection = async () => {
        
            try {
              const response = await http.get(
                "http://localhost:3000/api/getCollection",
                {},
                {
                  headers: {
                    authorization: localStorage.getItem("sessionID"),
                  },
                }
              );
              
              console.log(response);
              alert("Successful photos loading!");

              setLoading(false);
            } catch (err) {
              alert("Wrong email or password");
              
            }
          }

    useEffect(() => {
            getCollection();
     }, []);
    
    
    return (
        <>
            
            {!loggedIn && <h2>You are not logged in, please login</h2>}
            {loading && <h2 className="loading">Please wait, the gallery is loading...</h2>}


        </>
    );
};

export default Collections;