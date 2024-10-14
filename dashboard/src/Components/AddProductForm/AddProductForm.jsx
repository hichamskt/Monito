import React , { useRef, useState }from 'react'
import "../AddProductForm/AddProductForm.css"
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';


function AddProductForm({setShowAddPrd}) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name == files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

   

  return (
    <div className='addProfuctForm'>
        <div className='adp-Header'>
            <h3>Create New Product</h3>
            <RxCross2 onClick={()=>setShowAddPrd(false)} />
        </div>
        <hr></hr>
        <h3 className='addp-sec-ttl'>Basic Information</h3>
        <div className='adp-basicinfo'>
        <div className="addp-input-group">
              <span className="ad-ig-text">Product Name</span>
              <input type="text" className="ad-field" placeholder="Pets Name" />
        </div>
        <div className="addp-input-group">
              <span>Category:</span>
              <select id="options" value="dd">
                <option value="">--Please choose an option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
  
        <div className="addp-input-group">
              <span className="ad-ig-text">product Sku</span>
              <input type="text" className="ad-field" placeholder="Purchase price" />
        </div>
        </div>
        <hr></hr>
        <h3 className='addp-sec-ttl'>Media<span>(images)</span></h3>
        <div className='addp-img-section'>
          
        {images.map((images, index) => (
          <div className="addp-image" key={index}>
            <span className="addp-delete" onClick={() => deleteImage(index)}>
              <RxCross2 className='addp-cross'/>
            </span>
            <img src={images.url} alt={images.name}></img>
          </div>
        ))}
{images.length<4 && <div className='addp-add-img' role='button' onClick={selectFiles}>
            <FaPlus></FaPlus>
          </div>}
        <input
          name="file"
          ref={fileInputRef}
          type="file"
          className="addp-file"
          multiple
          onChange={onFileSelect}
        ></input>
        </div>
        <hr />
          <h3>Sale information</h3>
        <div className='addp-inv'>
        <div className="addp-inv-input-group">
              <span className="ad-ig-text">purchase price</span>
              <input type="number" className="ad-field" placeholder="purchase price" />
        </div>
        <div className="addp-inv-input-group">
              <span className="ad-ig-text">Selling price</span>
              <input type="number" className="ad-field" placeholder="Selling price" />
        </div>
        <div className="addp-inv-input-group ">
              <span className="ad-ig-text">Profit</span>
              <input type="number" className="ad-field" placeholder="00" disabled />
        </div>
        </div>
        <hr />
        <h3>Inventory</h3>
        <div className='addp-inv'>
        <div className="addp-input-group">
              <span className="ad-ig-text">Quantity</span>
              <input type="text" className="ad-field" placeholder="Purchase price" />
        </div>
        <div className="addp-input-group">
        <span>Unite:</span>
              <select id="options" value="dd">
                <option value="">Unit</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
        </div>
        </div>
        <hr />
        <div className='addp-button-sec'>
          <button>Save</button>
        </div>
    </div>
  )
}

export default AddProductForm