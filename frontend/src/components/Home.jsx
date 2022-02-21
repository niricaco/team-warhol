import { useState, useEffect } from "react";
import "./style/home.css";
import Gallery from "./Gallery";
import axios from "axios";

const Home = () => {
  const [artworks, setArtworks] = useState([]);

  const displayImages = artworks.map((item) => {
    return <Gallery key={item.id} image={item.images.web.url} />;
  });

  const load = async () => {
    const response = await axios.get(
      `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=4`
    );
    setArtworks(response.data.data);
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <div id="homepageContainer">
        <section className="headerBlock">
          <div className="headerImage"></div>
          <div className="introText">
            <h1>Welcome at Warhol Art Gallery</h1>
            <h2>
              Painting is poetry that is seen rather than felt, and poetry is
              painting that is felt rather than seen.
            </h2>
            <p className="homeText">
              Search, browse, like and do stuff. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        </section>

        <section className="gallery">
          <div className="hrHolder">
            <hr />
            <hr className="separator" />
          </div>
          <h2 className="h2Art">Gallery's finest (under construction)</h2>

          {displayImages}
          {/* ide jön még néhány kép, 5-10 kb, csak képek */}
        </section>

        <section className="artServices">
          <div className="hrHolder">
            <hr />
            <hr className="separator" />
          </div>
          <h2 className="h2Art">Dive deep into art with us</h2>

          <div className="serviceHolder">
            <div className="browseArt">
              <h3 className="h3Art">Search categories</h3>

              <img
                className="responsiveImage"
                src="https://images.unsplash.com/photo-1569172122301-bc5008bc09c5"
                alt="painting"
              ></img>

              <p className="serviceText">
                Search, browse, like and do stuff. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.{" "}
              </p>
              <button className="serviceButtons">Want to see more</button>
            </div>

            <div className="saveArt">
              <h3 className="h3Art">Save your favorites</h3>
              <div className="picHolder">
                <img
                  className="responsiveImage"
                  src="https://images.unsplash.com/photo-1569172122301-bc5008bc09c5"
                  alt="painting"
                ></img>
              </div>
              <p className="serviceText">
                Search, browse, like and do stuff. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.{" "}
              </p>
              <button className="serviceButtons">
                Let's make a collection
              </button>
            </div>
          </div>
          <div className="hrHolder">
            <hr />
            <hr className="separator" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
