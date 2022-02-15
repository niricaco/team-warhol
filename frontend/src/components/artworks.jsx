import React, { Profiler, useEffect, useState } from "react";
// import Artwork from "./artwork";
import axios from "axios";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);

  const load = async () => {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks/"
    );
    setArtworks(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  console.log(artworks);
  const titleList = artworks.map((item) => item.title)
  console.log(titleList);

  //képek az images -> web -> url utvonalon

  const accessNumList = artworks.map((item) => item.accession_number)
  console.log(accessNumList);
  //kép elérése: https://openaccess-cdn.clevelandart.org/1915.534/1915.534_web.jpg <--- '1915.534', ezt mind a két helyen {} az accessNumList


  return (
    <div className="characterHolder">
      <ol>
        {artworks.map((item) => (
          <li key={item.accession_number}>{item.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default Artworks;

/*const [xappToken, setXappToken] = useState([]);
const clientID = "efcb8eb8f8778d39695f",
  clientSecret = "bb837994bfd8df9f962b9862c81e3a83",
  apiUrl = "https://api.artsy.net/api/tokens/xapp_token";

const token = async () => {
  const response = await axios.post(apiUrl, {
    client_id: clientID,
    client_secret: clientSecret,
  });
  setXappToken(response.data.token);
};

const load = async () => {
  const response = await axios.get("https://api.artsy.net/api/artworks", {
    headers: { "X-Xapp-Token": xappToken },
  });
  setArtworks(response.data._embedded.artworks);
};

useEffect(() => {
  token();
  load();
}, [xappToken]);
console.log(artworks);

/* {artworks.map((item) => (
  <Artwork
    key={item.id}
    name={item.title}
    image={item.thumbnail}
    species={item.species}
    status={item.status}
    gender={item.gender}
    origin={item.origin.name}
    key={item.name}
  />
))} */
