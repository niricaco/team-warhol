import React, { useEffect, useState } from "react";
// import Artwork from "./artwork";
import axios from "axios";
import "./style/artworks.css";
import Artwork from "./artwork";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [toShow, setToShow] = useState("hidden");

  const load = async () => {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10"
    );
    /* "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&artists=John%Constable" */
    setArtworks(response.data.data);
  };
  console.log(artworks);

  useEffect(() => {
    load();
  }, []);

  //console.log(artworks);
  //const titleList = artworks.map((item) => item.title);
  //console.log(titleList);

  //képek az images -> web -> url utvonalon

  //const accessNumList = artworks.map((item) => item.accession_number);
  //console.log(accessNumList);
  //kép elérése: https://openaccess-cdn.clevelandart.org/1915.534/1915.534_web.jpg <--- '1915.534', ezt mind a két helyen {} az accessNumList

  /* <ol></ol>
        {artworks.map((item) => (
          <li key={item.accession_number}>{item.title}</li>
        ))}
      </ol> */

  return (
    <>
      <div className="grid">
        {artworks.map((item) => (
          <>
            <div className="grid_item" key={item.accession_number}>
              <div className="card">
                {/* {item.creators[0].description}:  */}

                <img
                  className="card_img"
                  src={item.images.web.url}
                  alt=""
                ></img>

                <div className="card_content">
                  <h1 className="card_header">{item.title}</h1>
                  <p className="card_text">{item.creators[0].description}</p>
                  <button className="card_btn" onClick={() => setToShow(" ")}>
                    More info... <span>&rarr;</span>
                  </button>
                </div>
                <div class={toShow}>
                  {/*<Artwork
                    title={item.title}
                    image={item.images.web.url}
                    creator={item.creators[0].description}
                    date={item.creation_date}
                    desc={item.wall_description}
                    funfact={item.fun_fact}
                  />*/}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Artworks;

/*
onClick={() => loadartwork(item.accession_number, item.title, item.creators[0].description, item.images.web.url, item.fun_fact, item.creation_date, item.wall_description )}>
*/
