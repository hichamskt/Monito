import React from 'react'
import { FaSearch } from "react-icons/fa";
import "../Styles/ProductsPage.css"
function ProductsPage() {
  return (
    <div className='product-Page'>
        <h2 className="pp-sectiontitle">Dogs</h2>
        <div className="pp-search">
        <div className="pp-searchinput">
          <FaSearch />
          <input type="text" placeholder="Search"></input>
        </div>
        <button>+ Add Product</button>
      </div>
    </div>
  )
}

export default ProductsPage