import React, { useState , forwardRef } from "react";
import "../Filtter/Filter.css";


function Filter({
  setFiltredData,
  dogsData
}) {

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleCheckboxChange = (event, stateUpdater, property) => {
    const { value, checked } = event.target;
  
    
    stateUpdater((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  
    
    setFiltredData((prev) =>
      prev.filter((item) => {
        const updatedState = checked
          ? [...stateUpdater, value]
          : stateUpdater.filter((state) => state !== value);
  
        return updatedState.includes(item[property]);
      })
    );
  };
  

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };



  console.log(dogsData);
  

  

  return (
    <div className="filtercontainer">
      <h2>Filter</h2>
      <h3>Gender</h3>
      <div >
        <label>
          <input
            type="checkbox"
            name="male"

            onChange={(e) => handleCheckboxChange(e, setSelectedColors)}
            
          />
          Male
        </label>

        <label>
          <input
            type="checkbox"
            name="female"
            
            onChange={(e) => handleCheckboxChange(e, setSelectedColors)}

          />
          Female
        </label>
      </div>
      <hr></hr>
      <h3>Color</h3>
      <div className="color">
        <label>
          <input type="checkbox" name="red" />
          <div className="red"></div>
          <p>Red</p>
        </label>
      </div>
      <div className="color">
        <label>
          <input type="checkbox" name="apricot" />
          <div className="apricot"></div>
          <p>apricot</p>
        </label>
      </div>
      <div className="color">
        <label>
          <input type="checkbox" name="black" />
          <div className="black"></div>
          <p>Black</p>
        </label>
      </div>
      <div className="color">
        <label>
          <input type="checkbox" name="black_white" />
          <div className="black_white"></div>
          <p>Black & white</p>
        </label>
      </div>
      <div className="color">
        <label>
          <input type="checkbox" name="silver" />
          <div className="silver"></div>
          <p>Silver</p>
        </label>
      </div>
      <div className="color">
        <label>
          <input type="checkbox" name="tan" />
          <div className="tan"></div>
          <p>tan</p>
        </label>
      </div>
      <hr></hr>
      <h3>Price</h3>
      <div className="pricefilter">
        <input type="number" min={0} placeholder="Min"></input>
        <input type="number" min={0} placeholder="Max"></input>
      </div>
      <hr />
      <h3>Bread</h3>
      <label>
        <input type="checkbox" name="Small" />
        Small
      </label>
      <label>
        <input type="checkbox" name="Meduim" />
        Meduim
      </label>
      <label>
        <input type="checkbox" name="Large" />
        Large
      </label>
      <hr></hr>
    </div>
  );
}

export default Filter;
