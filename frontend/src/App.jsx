/* Thanks for your interest in the Harvard Art Museums API. Here is your key.

a935e3b6-39b3-439a-baab-64f82bef02df

Documentation is at https://github.com/harvardartmuseums/api-docs. */

import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [serieses, setSerieses] = useState([]);
  const clientID = "efcb8eb8f8778d39695f",
    clientSecret = "bb837994bfd8df9f962b9862c81e3a83",
    apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
  let xappToken = [];

  const token = async () => {
    await axios
      .post(apiUrl, {
        client_id: clientID,
        client_secret: clientSecret,
      })
      .then(function (response) {
        xappToken = response.data.token;
      })
      .catch(function (error) {
        console.log(error);
      });
    load();
  };

  const load = async () => {
    const response = await axios.get("https://api.artsy.net/api/artworks", {
      headers: { "X-Xapp-Token": xappToken },
    });
    console.log(response.data._embedded.artworks[0]._links.thumbnail.href);
    setSerieses(response);
  };

  /*axios 
    .get(URL, { headers: { Authorization: AuthStr } })
    .then((response) => {
      // If request is good...
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error " + error);
    }); */

  useEffect(() => {
    token();
  }, []);

  return (
    <div>
      <p>szoveg</p>
    </div>
  );
}

export default App;

/* var request = require("superagent");

request
  .post(apiUrl)
  .send({ client_id: clientID, client_secret: clientSecret })
  .end(function (res) {
    xappToken = res.body.token;
  }); */
