import React ,{useState} from 'react'
import ReactPaginate from 'react-paginate';
import "../Pagination/Pagination.css"



function Pagination({ data  ,setItemOffset ,itemsPerPage }) {
    


const pageCount = Math.ceil(data.length / itemsPerPage);


function handlePageClick (event){
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);

}

    return(
        <div>
 <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="paginationcontainer"
        pageClassName="paginationli"
        pageLinkClassName="paginationa"
        activeClassName="paginationactive"
        previousClassName="paginationprv"
        nextClassName="paginationnxt"
      />
        </div>
    );
}

export default Pagination