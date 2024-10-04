import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import "../Styles/ProductsPage.css"
import dog from "../assets/dog1.png";
import { FaPencilAlt } from "react-icons/fa";
import Pagination from '../Components/Pagination/Pagination';
import AddProductForm from '../Components/AddProductForm/AddProductForm';
import UpdateProduct from '../Components/UpdateProduct/UpdateProduct';


function ProductsPage() {
  const [showAddPrd,setShowAddPrd]=useState(true);
  const [showUpdatePrd,setShowUpdatePrd]=useState(true);



    const data =  Array(9).fill('X')
  return (
    <div className='product-Page'>
      {showAddPrd && <AddProductForm  setShowAddPrd={setShowAddPrd}></AddProductForm>}
      {showUpdatePrd && <UpdateProduct setShowUpdatePrd={setShowUpdatePrd}></UpdateProduct>}
      {showAddPrd && <div className='darkeffect'></div>}
      {showUpdatePrd && <div className='darkeffect'></div>}
        <h2 className="pp-sectiontitle">Products Listing</h2>
        <div className="pp-search">
        <div className="pp-searchinput">
          <FaSearch />
          <input type="text" placeholder="Search"></input>
        </div>
        <button onClick={()=>setShowAddPrd(true)}>+ Add Product</button>
      </div>
        {/* Prosuct Table*/}
        <div className="ProductsTable">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Status</th>
              <th>Category</th>
              <th>Inventory</th>
              <th>Price</th>
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>
                  <img src={dog}></img>
                </td>
                <td>Cat scratching ball toy kitten sisal rope ball</td>
                <td>
                <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
                  </label>
                  </td>
                <td>
                   Dogs Food
                </td>
                <td>
                  12
                </td>
                <td>
                  <span >15000 vnd</span>
                </td>
                <td>
                  <span className='pointer'><FaPencilAlt /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination></Pagination>
      </div>
    </div>
  )
}

export default ProductsPage