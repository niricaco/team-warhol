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
