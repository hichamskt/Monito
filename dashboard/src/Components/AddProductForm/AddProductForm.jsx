import React from 'react'
import "../AddProductForm/AddProductForm.css"
import { RxCross2 } from "react-icons/rx";

function AddProductForm() {
  return (
    <div className='addProfuctForm'>
        <div className='adp-Header'>
            <h3>Create New Product</h3>
            <RxCross2 />
        </div>
        <hr></hr>
        <h3>Basic Information</h3>
        <div className='adp-basicinfo'>
        <div className="ad-input-group">
              <span className="ad-ig-text">Name</span>
              <input type="text" className="ad-field" placeholder="Pets Name" />
        </div>
       
        </div>
    </div>
  )
}

export default AddProductForm