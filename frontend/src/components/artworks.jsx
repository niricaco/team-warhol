import React, { useEffect, useState } from "react";
// import Artwork from "./artwork";
import axios from "axios";
import "./style/artworks.css";
import Artwork from "./artwork";
import ReactPaginate from "react-paginate";


const Artworks = () => {
    const [artworks, setArtworks] = useState([]);  
    const [pageNumber, setPageNumber] = useState(0)

    const artworksPerPage = 9;
    const pagesVisited = pageNumber * artworksPerPage

    const displayArts = artworks
        .slice(pagesVisited, pagesVisited + artworksPerPage)
        .map((item) => {
            return (
          
            <Artwork
                    title={item.title}
                    index={item.accession_number}
                    image={item.images.web.url}
                    creator={item.creators[0].description}
                    date={item.creation_date}
                    desc={item.wall_description}
                    funfact={item.fun_fact} 
            />
          
        )});

    const pageCount = Math.ceil(artworks.length / artworksPerPage);
    const changePage = ({selected}) => {
            setPageNumber(selected);
    };
       

    const load = async () => {
        const response = await axios.get(
            `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=100&page=${pageNumber}`
            );
        setArtworks(response.data.data);
    };
    //console.log(artworks);

    useEffect(() => {
        load();
    }, []);


  return (
    <>
      <div className="grid">
        {displayArts}
      </div>
      <ReactPaginate
        previousLabel={"Previous Arts"}
        nextLabel={"Next Arts"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
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
