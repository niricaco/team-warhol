// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./style/artworks.css";
// import "./style/pagination.css";
// import Artwork from "./artwork";
// import ReactPaginate from "react-paginate";


// const Artworks = () => {

//   const artworksPerPage = 4;
//   const [artworks, setArtworks] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);

//   const pagesVisited = pageNumber * artworksPerPage;

//   const displayArts = artworks
//     .slice(pagesVisited, pagesVisited + artworksPerPage)
//     .map((item) => {
//       return (
//         <Artwork
//           title={item.title}
//           index={item.accession_number}
//           image={item.images.web.url}
//           creator={
//             item.creators.length > 0
//               ? item.creators[0].description
//               : "Creator unknown"
//           }
//           date={item.creation_date}
//           desc={item.wall_description}
//           funfact={item.fun_fact}
//         />
//       );
//     });

//   const pageCount = Math.ceil(artworks.length / artworksPerPage);
//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//     console.log(selected + 1);
//   };

//   const load = async () => {
//     const response = await axios.get(
//       `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=20&page=${pageNumber}`
//     );
//     setArtworks(response.data.data);
//   };
//   //console.log(artworks);

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <>
//       <div className="grid">{displayArts}</div>
//       <div className="paginate-container">
//         <ReactPaginate
//           previousLabel={"Previous Arts"}
//           nextLabel={"Next Arts"}
//           pageCount={pageCount}
//           onPageChange={changePage}
//           containerClassName={"paginationBttns"}
//           previousLinkClassName={"previousBttn"}
//           nextLinkClassName={"nextBttn"}
//           disabledClassName={"paginationDisabled"}
//           activeClassName={"paginationActive"}
//         />
//       </div>
//     </>
//   );
// };
