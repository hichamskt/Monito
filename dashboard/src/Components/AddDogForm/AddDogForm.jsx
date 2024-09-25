import React from "react";
import "../AddDogForm/AddDogForm.css";

function AddDogForm() {
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
        <h3>Pets Infomrmation</h3>
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
            <h3>Additional Information</h3>
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
            </div>
            <div className="ad-checkout">
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
            </div>
            <div className="ad-checkout">
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
            </div>
            <div className="ad-checkout">
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
            </div>
            <div className="ad-checkout">
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
      </div>
    </div>
  );
}

export default AddDogForm;
