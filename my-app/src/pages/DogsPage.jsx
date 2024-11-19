import React, { useEffect, useState } from "react";
import "../styles/DogsPage.css";
import Header from "../components/Header/Header";
import BreadCrumb from "../UI/BreadCrumb/BreadCrumb";
import CategoryDogPoster from "../components/CategoryDogPoster/CategoryDogPoster";
import Filter from "../components/Filtter/Filter";
import filter from "../assets/filter.png";
import ProductCard from "../components/ProductCard/ProductCard";
import { useMediaQuery } from "react-responsive";

import nodata from "../assets/empty-box.png";

import ShopIcone from "../UI/ShopIcone/ShopIcone";
import { useAppContext } from "../AppContex";
import Cart from "../components/Cart/Cart";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";


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
                  className="sort-select"
                  
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
            {filterdData?.length === 0 ? <div className="nodogfound"><img src={nodata} alt="no dogs"></img> <p>No Dogs Were Found</p></div> :<div className="cateDogCards">
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
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogsPage;

