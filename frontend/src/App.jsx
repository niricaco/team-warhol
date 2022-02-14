import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { useArtworks } from "./api/useData";

function App() {
  const [artworks, setArtworks] = useState([]);
  const [xappToken, setXappToken] = useState([]);
  const clientID = "efcb8eb8f8778d39695f",
    clientSecret = "bb837994bfd8df9f962b9862c81e3a83",
    apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

  const token = async () => {
    const response = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret,
    });
    setXappToken(response.data.token);
    console.log(xappToken);
  };

  const load = async () => {
    const response = await axios.get("https://api.artsy.net/api/artworks", {
      headers: { "X-Xapp-Token": xappToken },
    });
    console.log(response);
    setArtworks(response.data._embedded);
  };

  useEffect(() => {
    token();
    load();
  }, [xappToken]);
  console.log(artworks);

  return (
    <div>
      <p>szoveg</p>
    </div>
  );
}

export default App;
