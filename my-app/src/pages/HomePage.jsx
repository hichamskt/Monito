import React, { useEffect } from "react";
import "../styles/HomePage.css";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import TitleSection from "../components/TitleSection/TitleSection";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppContex";

import ProductCard from "../components/ProductCard/ProductCard";
import FirstPoster from "../components/FirstPoster/FirstPoster";
import Button from "../components/Button/Button";
import axiosInstance from "../axios/axiosInstance";



import DogProductCard from "../components/DogProductCard/DogProductCard";
import PetSellers from "../components/PetSellers/PetSellers";
import AdoptionPoster from "../components/AdoptionPoster/AdoptionPoster";

import img1 from "../assets/kno1.png"
import img2 from "../assets/kno2.png"
import img3 from "../assets/kno3.png"
import DogKnowledgeCard from "../components/DogKnowledgeCard/DogKnowledgeCard";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import ShopIcone from "../UI/ShopIcone/ShopIcone";
import Cart from "../components/Cart/Cart";
const dummyKnowledgeData = [
  {
    imag:img1,
    title:"What is a Pomeranian? How to Identify Pomeranian Dogs",
    desc:"The Pomeranian, also known as the Pomeranian (Pom dog), is always in the top of the cutest pets. Not only that, the small, lovely, smart, friendly, and skillful circus dog breed."
  },
  {
    imag:img2,
    title:"Dog Diet You Need To Know",
    desc:"Dividing a dog's diet may seem simple at first, but there are some rules you should know so that your dog can easily absorb the nutrients in the diet. For those who are just starting to raise dogs, especially newborn puppies with relatively weak resistance."
  },
  {
    imag:img3,
    title:"Why Dogs Bite and Destroy Furniture and How to Prevent It Effectively",
    desc:"Dog bites are common during development. However, no one wants to see their furniture or important items being bitten by a dog."
  },
]



function HomePage() {
const [dogData,setDogData]=useState([]);
const [productData,setProductData]=useState([]);
const { showCard } = useAppContext();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/dog/getdogs");
        setDogData(response.data);
      } catch (err) {
        console.log(err)
      } 
    };

    fetchData();

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/product/getallproducts");
        setProductData(response.data);
      } catch (err) {
        console.log(err)
      }
    };
    
    fetchData();

  }, []);
  
  
  return (
    <div>
      <div className="colored">
        <div className="container">
          <Header></Header>
          {showCard && <Cart/>}
      {showCard && <div className='overlay-black'></div>}
      
          <ShopIcone/>
          <HeroSection></HeroSection>
        </div>
      </div>
      <div className="container">
        <TitleSection
          Title="Whats new?"
          Text="Take A Look At Some Of Our Pets"
          ButtonText="View more"
          linktonavigate='/category'
        ></TitleSection>
        <div className="dogsSection">
          {dogData.map((item, index) => (
            <Link to={`/dog/${item.id}`} key={index} style={{ textDecoration: "none"}}>
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
        <Button></Button>
        <FirstPoster></FirstPoster>
        <TitleSection
          Title="Hard to choose right products for your pets?"
          Text="Our Products"
          ButtonText="View more"
          linktonavigate='/Products'
        ></TitleSection>

        <div className="dogsSection">
          {productData.map((item, index) => (
          <Link to={`/Products/product/${item.id}`} key={index} style={{ textDecoration: "none"}}>
            <DogProductCard
              imag={item.images}
              desc={item.porductName}
              prix={item.sellingPrice}
              product={item.productCategory}
              size={item.size}
              sizeUnit={item.sizeUnit}
              key={index}
            ></DogProductCard>
            </Link>
          ))}
        </div>

        <Button></Button>

        <PetSellers></PetSellers>
        <Button></Button>
          <AdoptionPoster></AdoptionPoster>
          <TitleSection
          Title="You Already Know?"
          Text="Useful Pet Knowledge"
          ButtonText="View more"
          
        ></TitleSection>

        <div className="dogknowledgesection">
          {
            dummyKnowledgeData.map((item,index)=>(
              <DogKnowledgeCard key={index} item={item} />
            ))
          }
        </div>
      </div>
        <Footer></Footer>
    </div>
  );
}

export default HomePage;
