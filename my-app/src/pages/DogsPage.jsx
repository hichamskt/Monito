import React from "react";
import "../styles/DogsPage.css";
import Header from "../components/Header/Header";
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import CategoryDogPoster from "../components/CategoryDogPoster/CategoryDogPoster";
import Filter from "../components/Filtter/Filter";
import filter from "../assets/filter.png";
import ProductCard from "../components/ProductCard/ProductCard";
import dog1 from "../assets/dog1.png";
import dog2 from "../assets/dog2.png";
import dog3 from "../assets/dog3.png";
import dog4 from "../assets/dog4.png";
import dog5 from "../assets/dog5.png";
import dog6 from "../assets/dog6.png";
import dog7 from "../assets/dog7.png";
import dog8 from "../assets/dog8.png";



const dummyDogData = [
    {
      imag: dog1,
      desc: "MO231 - Pomeranian White",
      gene: "Male",
      age: 2,
      prix: 69000000,
    },
    {
      imag: dog2,
      desc: "MO502 - Poodle  Tiny Yellow",
      gene: "Female",
      age: 2,
      prix: 39000000,
    },
    {
      imag: dog3,
      desc: "MO102 - Poodle  Tiny Sepia",
      gene: "Male",
      age: 2,
      prix: 40000000,
    },
    {
      imag: dog4,
      desc: "MO512 - Alaskan  Malamute Grey",
      gene: "Male",
      age: 2,
      prix: 89000000,
    },
    {
      imag: dog5, 
      desc: "MO231 - Pembroke  Corgi Cream",
      gene: "Male",
      age: 2,
      prix: 79000000,
    },
    {
      imag: dog6,
      desc: "MO502 - Pembroke  Corgi Tricolor",
      gene: "Female",
      age: 2,
      prix: 90000000,
    },
    {
      imag: dog7,
      desc: "MO231 - Pomeranian  White",
      gene: "Female",
      age: 2,
      prix: 65000000,
    },
    {
      imag: dog8,
      desc: "MO512 - Poodle  Tiny Dairy Cow",
      gene: "Male",
      age: 2,
      prix: 50000000,
    },
  ];

function DogsPage() {
  return (
    <div className="container">
      <Header></Header>
      <div className="dogspage">
        <BreadCrumb tring="Category dogs small dogs"></BreadCrumb>
        <CategoryDogPoster></CategoryDogPoster>
        <div className="dogspageside">
          <Filter></Filter>
          <div className="categorypets">
            <div className="categorypetsTitle">
              <span>
                <h2>Small Dogs</h2>
                <p>52 puppies</p>
              </span>
              <div className="categorypetsinput">
                
                <select
                  id="sortBy"
                  class="sort-select"
                  onchange="sortByOption()"
                >
                  <option value="popularity">Popularity</option>
                  <option value="date-asc">Date (Newest first)</option>
                  <option value="date-desc">Date (Oldest first)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>

                <div className="filtericon">
                  <img src={filter} alt="filter"></img>
                  <h3>Filter</h3>
                </div>
              </div>
            </div>
            <div className="cateDogCards">
            {dummyDogData.map((item, index) => (
            <ProductCard
              imag={item.imag}
              desc={item.desc}
              gene={item.gene}
              age={item.age}
              prix={item.prix}
              key={index}
            ></ProductCard>
          ))}
          
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogsPage;
