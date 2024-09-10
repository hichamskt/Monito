import React, { useState , forwardRef } from "react";
import "../Filtter/Filter.css";


function Filter() {
  const [selected, setSelected] = useState({
    colors: {
      red: false,
      green: false,
      blue: false,
    },
    gender: {
      male: false,
      female: false,
    },
    size: {
      Small: false,
      Medium: false,
      Large: false,
    },
  });

  const handleColorChange = (event) => {
    const { name, checked } = event.target;
    setSelected((prevPreferences) => ({
      ...prevPreferences,
      colors: { ...prevPreferences.colors, [name]: checked },
    }));
  };

  const handleGenderChange = (event) => {
    const { name, checked } = event.target;
    setSelected((prevPreferences) => ({
      ...prevPreferences,
      gender: { ...prevPreferences.gender, [name]: checked },
    }));
  };

  return (
    <div className="filtercontainer">
      <h2>Filter</h2>
      <h3>Gender</h3>
      <div >
        <label>
          <input
            type="checkbox"
            name="male"
            checked={selected.gender.male}
            onChange={handleGenderChange}
          />
          Male
        </label>

        <label>
          <input
            type="checkbox"
            name="female"
            checked={selected.gender.female}
            onChange={handleGenderChange}
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
