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
