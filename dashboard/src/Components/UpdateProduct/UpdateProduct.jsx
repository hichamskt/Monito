import React , { useRef, useState }from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import axiosInstance from '../../axios/axiosInstance';

function UpdateProduct({setShowUpdatePrd,item, setRefresh}) {
    
    const [images, setImages] = useState([...item.images]);
    const [imagesarr, setImagesArr] = useState([]);
    
    const fileInputRef = useRef(null);
console.log(item)
   
  const [formData, setFormData] = useState({
    _id:item._id,
    porductName: item.porductName,
    productCategory:item.productCategory,
    productSku:item.productSku,
    purchasePrice:item.purchasePrice,
    sellingPrice:item.sellingPrice,
    quantity:item.quantity,
    unite:item.unite,
    status:item.status,
  });

  const [profit,setProfit]=useState(  Number(formData.sellingPrice) - Number(formData.purchasePrice) );

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setImagesArr(images.map((item)=>item.url));

    
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });
  
    for (let i = 0; i < images.length; i++) {
      fd.append('images', images[i].file); 
    }
    for (let i = 0; i < images.length; i++) {
      fd.append('imagesarr', images[i].url); 
    }
    
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/updatproduct",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
       setShowUpdatePrd(false);
       setRefresh((prv)=>!prv);
      }
    } catch (error) {
      console.log(error.response?.data);
      
    }
    
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
      
      setProfit(prevProfit => {
        const purchasePrice = name === 'purchasePrice' ? Number(value) : Number(formData.purchasePrice);
        const sellingPrice = name === 'sellingPrice' ? Number(value) : Number(formData.sellingPrice);
        return sellingPrice - purchasePrice;
      });



    
  };




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
            file: files[i],
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


  const hundleDelet = async () => {
    try {
      const response = await axiosInstance.delete("/product/deletproductbyid", {
        data: { _id: item._id },
      });
      if (response.status === 200) {
        console.log("Deletion successful:", response.data);
        setShowUpdatePrd(false);

      }
    } catch (err) {
      console.log(err);
    }
  };
   

  return (
    <div className='addProfuctForm'>
        <div className='adp-Header'>
            <h3>Create New Product</h3>
            <RxCross2 onClick={()=>setShowUpdatePrd(false)} />
        </div>
        <hr></hr>
        <h3 className='addp-sec-ttl'>Basic Information</h3>
        <div className='adp-basicinfo'>
        <div className="addp-input-group">
              <span className="ad-ig-text">Product Name</span>
              <input type="text" className="ad-field" placeholder="Pets Name" value={formData.porductName}
                name="porductName"
                onChange={(e) => handleInputChange(e)}  />
        </div>
        <div className="addp-input-group">
              <span>Category:</span>
              <select id="options"  value={formData.productCategory}
                name="productCategory"
                onChange={(e) => handleInputChange(e)}>
                <option value="">--Please choose an option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
  
        <div className="addp-input-group">
              <span className="ad-ig-text">product Sku</span>
              <input type="text" className="ad-field" placeholder="Purchase price" value={formData.productSku}
                name="productSku"
                onChange={(e) => handleInputChange(e)} />
        </div>
        </div>
        <hr></hr>
        <h3 className='addp-sec-ttl'>Media<span>(images)</span></h3>
        <div className='addp-img-section'>
          
        {images.map((image, index) => (
          <div className="addp-image" key={index}>
            <span className="addp-delete" onClick={() => deleteImage(index)}>
              <RxCross2 className='addp-cross'/>
            </span>
            
            <img 
      src={image.url.includes('upload') ? `http://localhost:5000/${image.url}` : image.url} 
      alt={image.name}></img>
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
              <input type="number" className="ad-field" placeholder="purchase price"  value={formData.purchasePrice}
                name="purchasePrice"
                onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="addp-inv-input-group">
              <span className="ad-ig-text">Selling price</span>
              <input type="number" className="ad-field" placeholder="Selling price"   value={formData.sellingPrice}
                name="sellingPrice"
                
                onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="addp-inv-input-group ">
              <span className="ad-ig-text">Profit</span>
              <input type="number" className="ad-field" value={profit} placeholder="00" disabled  />
        </div>
        </div>
        <hr />
        <h3>Inventory</h3>
        <div className='addp-inv'>
        <div className="addp-input-group">
              <span className="ad-ig-text">Quantity</span>
              <input type="text" className="ad-field" placeholder="00"   value={formData.quantity}
                name="quantity"
                onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="addp-input-group">
        <span>Unite:</span>
              <select id="options"  value={formData.unite}
                name="unite"
                onChange={(e) => handleInputChange(e)}>
                <option value="">Unit</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
        </div>
        </div>
        <hr />
        <div className='addp-button-sec'>
          <button onClick={handleSubmitData}>Save</button>
          <button style={{backgroundColor:'red'}} onClick={hundleDelet}>Delete</button>
        </div>
    </div>
  )


}

export default UpdateProduct