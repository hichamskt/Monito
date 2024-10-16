import React, { useRef, useState } from "react";
import "../AddDogForm/AddDogForm.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

function AddDogForm({ setAddDogForm, setShowInfo , setRefresh }) {
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    location: "",
    category: "",
    size: "",
    color: "",
    birthDate: "",
    gender: "",
    vaccinated: "",
    dewormed: "",
    certified: "",
    microchip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    
    
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });
  
    for (let i = 0; i < images.length; i++) {
      fd.append('images', images[i].file); 
    }
    fd.append("additionalInfo",additionalInfo);
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/dog/addnewdog",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setAddDogForm(false);
        setRefresh((prv)=>!prv);
      }
    } catch (error) {
      console.log(error.response?.data);
      console.log(fd)
    }
    
  };

  const handleAddionInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleCancleButton() {
    setAddDogForm(false);
    setShowInfo(false);
  }
  const handleAddClick = () => {
    if (inputValue.trim() !== "") {
      setAdditionalInfo([...additionalInfo, inputValue]);
      setInputValue("");
    }
  };

  const handleDeletAddItem = (item) => {
    setAdditionalInfo(additionalInfo.filter((addits) => addits !== item));
  };

  return (
    <div className="addDogForm">
      <div className="addformheader">
        <h3 className="ad-h3">Add New Pet</h3>
        <div className="ad-btg">
          <button onClick={handleCancleButton}>Cancel</button>
          <button onClick={handleSubmitData}>Save</button>
        </div>
      </div>
      <hr />
      <div className="ad-doginfo">
        <h3>Pets Information</h3>
        <div className="ad-section">
          <div className="ad-inputs">
            <div className="ad-input-group">
              <span className="ad-ig-text">Name</span>
              <input
                type="text"
                className="ad-field"
                placeholder="Pets Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="ad-input-group">
              <span className="ad-ig-text">SKU</span>
              <input
                type="text"
                className="ad-field"
                placeholder="SKU"
                name="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="ad-input-group">
              <span className="ad-ig-text">Price</span>
              <input
                type="Number"
                className="ad-field"
                placeholder="price"
                name="price"
                value={formData.price}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="ad-input-group">
              <span className="ad-ig-text">Location</span>
              <input
                type="text"
                className="ad-field"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="ad-input-group">
              <span>Category:</span>
              <select
                id="options"
                value={formData.category}
                name="category"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">category</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="ad-input-group">
              <span>size:</span>
              <select
                id="options"
                value={formData.size}
                name="size"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">size</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="ad-input-group">
              <span>Color:</span>
              <select
                id="options"
                value={formData.color}
                name="color"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="">color</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="ad-input-group">
              <span className="ad-ig-text">Birth date</span>
              <input
                type="date"
                className="ad-field"
                name="birthDate"
                value={formData.birthDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className="ad-moreinfo">
            <div className="addse">
              <div className="ad-ck-box">
                <h3>CheckList</h3>
                <div className="ad-checkout">
                  <div className="ad-checkout-box">
                    <p>Gender:</p>
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                      />
                      male
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                      />
                      Female
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Vaccinated:</p>
                    <label>
                      <input
                        type="radio"
                        name="vaccinated"
                        value="true"
                        checked={formData.vaccinated === "true"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="vaccinated"
                        value="false"
                        checked={formData.vaccinated === "false"}
                        onChange={handleInputChange}
                      />
                      Not Yet
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Dewormed:</p>
                    <label>
                      <input
                        type="radio"
                        name="dewormed"
                        value="true"
                        checked={formData.dewormed === "true"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="false"
                        name="dewormed"
                        checked={formData.dewormed === "false"}
                        onChange={handleInputChange}
                      />
                      Not Yet
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Certified:</p>
                    <label>
                      <input
                        type="radio"
                        name="certified"
                        value="true"
                        checked={formData.certified === "true"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="certified"
                        value="false"
                        checked={formData.certified === "false"}
                        onChange={handleInputChange}
                      />
                      Non
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Microchip:</p>
                    <label>
                      <input
                        type="radio"
                        name="microchip"
                        value="true"
                        checked={formData.microchip === "true"}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="false"
                        name="microchip"
                        checked={formData.microchip === "false"}
                        onChange={handleInputChange}
                      />
                      Non
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ad-ad-info">
              <h3>Aditional Inforamtion</h3>
              <div className="ad-ad-infobox">
                <div className="ad-tags">
                  {additionalInfo.length > 0 ? (
                    additionalInfo.map((item, index) => (
                      <div className="ad-additionItem" key={index}>
                        <p>{item}</p>
                        <RxCross2 onClick={() => handleDeletAddItem(item)} />
                      </div>
                    ))
                  ) : (
                    <p>No Additional data</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleAddionInputChange}
                    placeholder="add aditional info"
                  ></input>
                  <button onClick={handleAddClick}>add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DragandDropSection images={images} setImages={setImages} />
    </div>
  );
}

export default AddDogForm;

function DragandDropSection({ images, setImages }) {
  const [isDragging, setIsDragging] = useState(false);

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
          {file: files[i],
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
  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "Copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

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
  return (
    <div className="ddp-card">
      <h3 className="ddp-title">Pets Photos</h3>
      <div className="ddp-top">
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDragging ? (
            <span className="ddp-select">Drop images here</span>
          ) : (
            <>
              Drag & Drop image here <div>or </div>
              <span className="ddp-select" role="button" onClick={selectFiles}>
                Browse
              </span>
            </>
          )}

          <input
            name="images"
            ref={fileInputRef}
            type="file"
            className="ddp-file"
            multiple
            onChange={onFileSelect}
          ></input>
        </div>
        <div className="ddp-container">
          {images.map((images, index) => (
            <div className="ddp-image" key={index}>
              <span className="ddp-delete" onClick={() => deleteImage(index)}>
                <RxCross2 />
              </span>
              <img src={images.url} alt={images.name}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
