import React, { isValidElement, useEffect, useState } from "react";

import "./style/artworks.css";
import "./style/pagination.css";
import Artwork from "./artwork";
import { getArtworks } from "./API";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ScrollButton from "./Scrollbutton";

const Artworks = (props) => {
  const setMessage = props.setMessage;
  setMessage("");
  const [artworks, setArtworks] = useState([]);
  // const [displayArts, setDisplayArts] = useState([]);
  // const [page, setPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchUrl, setSearchUrl] = useState("");

  const artworksPerPage = 12;
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * artworksPerPage;

  const displayArts = artworks
    .slice(pagesVisited, pagesVisited + artworksPerPage)
    .map((item) => {
      return (
        <Artwork
          key={item.accession_number}
          title={item.title}
          index={item.accession_number}
          image={item.images.web.url}
          creator={
            item.creators.length > 0
              ? item.creators[0].description
              : "Creator unknown"
          }
          date={item.creation_date}
          desc={item.wall_description}
          funfact={item.fun_fact}
          setMessage={setMessage}
          alreadySaved={false}
        />
      );
    });

  const pageCount = Math.ceil(artworks.length / artworksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    //console.log(selected + 1);
  };

  const load = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=120&page=${pageNumber}${searchUrl}`,
      {},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setArtworks(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [searchUrl]);

  const goSearch = (e) => {
    setSearchUrl("&q=" + searchTitle);
    e.preventDefault();
  };

  return (
    <main className="main">
      <form className="searchbar">
        <h2>
          <label>Search for title:</label>
        </h2>
        <input
          list="creator-list"
          id="searchArt"
          placeholder="Search for title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <datalist id="creator-list">
          {artworks.map((artwork) => {
            return <option value={artwork.title} />;
          })}
        </datalist>
        <button
          className="searchButtons"
          disabled={
            searchTitle.length >= 3 || searchTitle.length === 0 ? false : true
          }
          onClick={(e) => goSearch(e)}
        >
          Search
        </button>
      </form>

      <hr className="separator" />
      {!loading && (
        <>
          <div className="paginate-container">
            <ReactPaginate
              previousLabel="< Previous Art"
              nextLabel="Next Arts >"
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="paginationBttns"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </div>
          <div className="grid">{displayArts}</div>
        </>
      )}

      {loading && (
        <h2 className="loading">Please wait, the gallery is loading...</h2>
      )}
      {/* <div className="grid" onScroll={handleScroll}>{display}</div>*/}

      {/*<ScrollButton /> */}
    </main>
  );
};

export default Artworks;

/*
 "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&artists=John%Constable" 


onClick={() => loadartwork(item.accession_number, item.title, item.creators[0].description, item.images.web.url, item.fun_fact, item.creation_date, item.wall_description )}>

{<Artwork
  title={item.title}
                    image={item.images.web.url}
                    creator={item.creators[0].description}
                    date={item.creation_date}
                    desc={item.wall_description}
                    funfact={item.fun_fact}
                  />}
                  */

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

/*
        <label for="ice-cream-choice">Choose a flavor:</label>
        <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
        
        <datalist id="ice-cream-flavors">
        <option value="Chocolate">
        <option value="Coconut">
        <option value="Mint">
        <option value="Strawberry">
        <option value="Vanilla">
        </datalist>
        */

// const handleScroll = event => {
//     const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

//     if (scrollHeight - scrollTop === clientHeight ) {
//         setPage(prev => prev + 1);
//     }
// }

// const load = async () => {
//     setLoading(true);
//     const newArtworks = await getArtworks(page, searchUrl);
//     setArtworks(newArtworks);
//     setLoading(false);
//     //console.log(artworks);
// };

// useEffect(() => {
//     load();
// }, [page]);

// useEffect(() => {
//     load();
// }, [searchUrl]);

// const display = artworks.map((item) => {
//     return (
//         <Artwork
//             title={item.title}
//             index={item.accession_number}
//             image={item.images.web.url}
//             creator={
//                 item.creators.length > 0
//                 ? item.creators[0].description
//                 : "Creator unknown"
//             }
//             date={item.creation_date}
//             desc={item.wall_description}
//             funfact={item.fun_fact}
//             />
//             );
//         });
