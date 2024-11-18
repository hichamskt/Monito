import React, { useState , forwardRef, useEffect } from "react";
import "../Filtter/Filter.css";


function Filter({
  setFiltredData,
  dogsData,
  filterdData
}) {

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  console.log('data',dogsData)

  useEffect(() => {
    const filtered = dogsData?.filter((item) => {
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(item.color);
  
      const matchesGender =
        selectedGender.length === 0 || selectedGender.includes(item.gender);
  
      const matchesPrice =
        (priceRange.min === "" || item.price >= priceRange.min) &&
        (priceRange.max === "" || item.price <= priceRange.max);
  
      return matchesColor && matchesGender && matchesPrice;
    });
  
    setFiltredData(filtered);
  }, [selectedColors, selectedGender, priceRange]);
  
  
  

  console.log('gender',selectedGender)



  console.log('filtred',filterdData);
  

  

  return (
    <div className="filtercontainer">
      <h2>Filter</h2>
      <h3>Gender</h3>
      <div >
        <label>
          <input
            type="checkbox"
            name="Male"
            value="Male"
            onChange={(e) => {
              const { value, checked } = e.target;
              setSelectedGender((prev) =>
                checked ? [...prev, value] : prev.filter((gender) => gender !== value)
              );
            }}
            
          />
          Male
        </label>

        <label>
          <input
            type="checkbox"
            name="Female"
            value="Female"
            onChange={(e) => {
              const { value, checked } = e.target;
              setSelectedGender((prev) =>
                checked ? [...prev, value] : prev.filter((gender) => gender !== value)
              );
            }}

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
