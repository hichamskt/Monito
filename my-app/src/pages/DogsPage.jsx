import React, { useEffect, useState } from "react";
import "../styles/DogsPage.css";
import Header from "../components/Header/Header";
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import CategoryDogPoster from "../components/CategoryDogPoster/CategoryDogPoster";
import Filter from "../components/Filtter/Filter";
import filter from "../assets/filter.png";
import ProductCard from "../components/ProductCard/ProductCard";
import { useMediaQuery } from "react-responsive";

import dog1 from "../assets/dog1.png";
import dog2 from "../assets/dog2.png";
import dog3 from "../assets/dog3.png";
import dog4 from "../assets/dog4.png";
import dog5 from "../assets/dog5.png";
import dog6 from "../assets/dog6.png";
import dog7 from "../assets/dog7.png";
import dog8 from "../assets/dog8.png";
import ShopIcone from "../UI/ShopIcone/ShopIcone";
import { useAppContext } from "../AppContex";
import Cart from "../components/Cart/Cart";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";

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
  const [showFilter, setShowFilter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dogsData, setDogsData] = useState();
  const [filterdData, setFiltredData] = useState();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 846px)" });
  const { setShowCard, showCard } = useAppContext();
  const { breed } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axiosInstance.get(`/dog/getdogbybreed/${breed}`);
        setDogsData(response.data.dogs);
        setFiltredData(response.data.dogs);
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(breed);
    setFiltredData(dogsData);
  }, [breed]);

 
  const showFilterHundler = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="container">
      <Header></Header>
      {showCard && <Cart />}
      {showCard && <div className="overlay-black"></div>}

      <ShopIcone />
      <div className="dogspage">
        <BreadCrumb tring="Category dogs small dogs"></BreadCrumb>
        <CategoryDogPoster></CategoryDogPoster>
        <div className="dogspageside">
          {showFilter && <Filter setFiltredData={setFiltredData} dogsData={dogsData} filterdData={filterdData} ></Filter>}
          <div className="categorypets">
            <div className="categorypetsTitle">
              <span>
                <h2>{breed}</h2>
                <p> {filterdData?.length} puppies</p>
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

                <div className="filtericon" onClick={showFilterHundler}>
                  <img src={filter} alt="filter"></img>
                  <h3>Filter</h3>
                </div>
              </div>
            </div>
            <div className="cateDogCards">
              {!loading  &&  filterdData.map((item, index) => (
                <Link
                  to={`/dog/${item.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  
                  <ProductCard
                    imag={item.images}
                    desc={item.name}
                    gene={item.gender}
                    age={item.birthDate}
                    prix={item.price}
                    key={index}
                  ></ProductCard>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogsPage;
