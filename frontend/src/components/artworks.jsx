import React, { useEffect, useState } from "react";
// import Artwork from "./artwork";
import axios from "axios";
import "./artworks.css";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);

  const load = async () => {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10"
    );
    setArtworks(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  console.log(artworks);
  const titleList = artworks.map((item) => item.title);
  console.log(titleList);

  //képek az images -> web -> url utvonalon

  const accessNumList = artworks.map((item) => item.accession_number);
  console.log(accessNumList);
  //kép elérése: https://openaccess-cdn.clevelandart.org/1915.534/1915.534_web.jpg <--- '1915.534', ezt mind a két helyen {} az accessNumList

  /* <ol></ol>
        {artworks.map((item) => (
          <li key={item.accession_number}>{item.title}</li>
        ))}
      </ol> */

  return (
    <>
      <div class="grid">
        {artworks.map((item) => (
          <div class="grid_item" key={item.accession_number}>
            <div class="card">
              {/* {item.creators[0].description}:  */}

              <img class="card_img" src={item.images.web.url} alt=""></img>

              <div class="card_content">
                <h1 class="card_header">{item.title}</h1>
                <p class="card_text">{item.creators[0].description}</p>
                <button class="card_btn">
                  More info... <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Artworks;
