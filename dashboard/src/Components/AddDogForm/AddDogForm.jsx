import React, { useRef, useState } from "react";
import "../AddDogForm/AddDogForm.css";
import { RxCross2 } from "react-icons/rx";

function AddDogForm() {
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddionInputChange = (event) => {
    setInputValue(event.target.value);
  };

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
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
      <hr />
      <div className="ad-doginfo">
        <h3>Pets Information</h3>
        <div className="ad-section">
          <div className="ad-inputs">
            <div className="ad-input-group">
              <span className="ad-ig-text">Name</span>
              <input type="text" className="ad-field" placeholder="Pets Name" />
            </div>

            <div className="ad-input-group">
              <span className="ad-ig-text">SKU</span>
              <input type="text" className="ad-field" placeholder="SKU" />
            </div>

            <div className="ad-input-group">
              <span className="ad-ig-text">Price</span>
              <input type="Number" className="ad-field" placeholder="price" />
            </div>

            <div className="ad-input-group">
              <span className="ad-ig-text">Location</span>
              <input type="text" className="ad-field" placeholder="Location" />
            </div>

            <div className="ad-input-group">
              <span>Category:</span>
              <select id="options" value="dd">
                <option value="">--Please choose an option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="ad-input-group">
              <span>size:</span>
              <select id="options" value="dd">
                <option value="">--Please choose an option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="ad-input-group">
              <span>Color:</span>
              <select id="options" value="dd">
                <option value="">color</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="ad-input-group">
              <span className="ad-ig-text">Birth date</span>
              <input type="date" className="ad-field" placeholder="date" />
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
                      <input type="radio" value="Male" name="gender" />
                      male
                    </label>
                    <label>
                      <input type="radio" value="Female" name="gender" />
                      Female
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Vaccinated:</p>
                    <label>
                      <input type="radio" value="Male" name="Vaccinted" />
                      Yes
                    </label>
                    <label>
                      <input type="radio" value="Female" name="Vaccinted" />
                      Not Yet
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Dewormed:</p>
                    <label>
                      <input type="radio" value="yes" name="Dewormed" />
                      Yes
                    </label>
                    <label>
                      <input type="radio" value="non" name="Dewormed" />
                      Not Yet
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Cert:</p>
                    <label>
                      <input type="radio" value="yes" name="cert" />
                      Yes
                    </label>
                    <label>
                      <input type="radio" value="non" name="cert" />
                      Non
                    </label>
                  </div>

                  <div className="ad-checkout-box">
                    <p>Microchip:</p>
                    <label>
                      <input type="radio" value="yes" name="microship" />
                      Yes
                    </label>
                    <label>
                      <input type="radio" value="non" name="microship" />
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
      <DragandDropSection />
    </div>
  );
}

export default AddDogForm;

function DragandDropSection() {
  const [images, setImages] = useState([]);
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
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i != index));
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
          name="file"
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
            <span className="ddp-delete" onClick={() => deleteImage}>
              <RxCross2/>
            </span>
            <img src={images.url} alt={images.name}></img>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
