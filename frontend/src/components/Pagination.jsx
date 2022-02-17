import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const Pagination = ({ pageCount, changePage}) => {
    
    return <ReactPaginate
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
};

export default Pagination

// const Pagination = ({ totalPosts, artworksPerPage, paginate }) => {
//     const artworkNumbers = [];
  
//     for (let i = 1; i <= Math.ceil(totalPosts / artworksPerPage); i++) {
//       artworkNumbers.push(i);
//     }
  
//     return (
//       <nav>
//         <div>
//           {artworkNumbers.map((number) => (
//             <div key={number} className="page-item">
//               <a onClick={() => paginate(number)} href="!#" className="page-link">
//                 {number}
//               </a>
//             </div>
//           ))}
//         </div>
//       </nav>
//     );
//   };
  
//   export default Pagination;
  