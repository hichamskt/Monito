import React ,{useState} from 'react'
import ReactPaginate from 'react-paginate';
import "../Pagination/Pagination.css"

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Pagination({  }) {
    const [itemOffset, setItemOffset] = useState(0);
function handlePageClick (i){
console.log(i)
}

    return(
        <div>
 <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={15}
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