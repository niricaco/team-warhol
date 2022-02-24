import { useState, useEffect } from "react";
import "./style/home.css";
import Gallery from "./Gallery";
import axios from "axios";
import searchPic from "./style/img/search_categories.jpg";
import savePic from "./style/img/save_your_fav.jpg";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const loggedIn = props.loggedIn;
  const [artworks, setArtworks] = useState([]);

  const displayImages = artworks.map((item) => {
    return <Gallery key={item.id} image={item.images.web.url} />;
  });

  const load = async () => {
    try {
      const response = await axios.get(
        `https://artproxy.sloppy.zone/api/artworks/?has_image=1&limit=5`
      );
      setArtworks(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
            <h2 className="quote">
              "Painting is poetry that is seen rather than felt, and poetry is
              painting that is felt rather than seen."{" "}
              <span>- Leonardo da Vinci</span>
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
          <h2 className="h2Art">
            Sneak peek to our gallery's finest and most liked paintings
          </h2>

          <div className="imageHolder">{displayImages}</div>
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
                src={searchPic}
                alt="painting"
              ></img>

              <p className="serviceText">
                Search, browse, like and do stuff. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.{" "}
              </p>
              <NavLink to="/artworks">
                {" "}
                <button className="serviceButtons">Want to see more</button>
              </NavLink>
            </div>

            <div className="saveArt">
              <h3 className="h3Art">Save your favorites</h3>
              <div className="picHolder">
                <img
                  className="responsiveImage"
                  src={savePic}
                  alt="painting"
                ></img>
              </div>
              <p className="serviceText">
                Search, browse, like and do stuff. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.{" "}
              </p>
              <NavLink to={loggedIn ? "/collections" : "/signup"}>
                <button className="serviceButtons">
                  Let's make a collection
                </button>
              </NavLink>
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
