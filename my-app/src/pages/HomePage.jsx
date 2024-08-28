import React from "react";
import "../styles/HomePage.css";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import TitleSection from "../components/TitleSection/TitleSection";
import dog1 from "../assets/dog1.png";
import dog2 from "../assets/dog2.png";
import dog3 from "../assets/dog3.png";
import dog4 from "../assets/dog4.png";
import dog5 from "../assets/dog5.png";
import dog6 from "../assets/dog6.png";
import dog7 from "../assets/dog7.png";
import dog8 from "../assets/dog8.png";
import ProductCard from "../components/ProductCard/ProductCard";
import FirstPoster from "../components/FirstPoster/FirstPoster";
import Button from "../components/Button/Button";

import prd1 from "../assets/prd1.png";
import prd2 from "../assets/prd2.png";
import prd3 from "../assets/prd3.png";
import prd4 from "../assets/prd4.png";
import prd5 from "../assets/prd5.png";
import prd6 from "../assets/prd6.png";
import prd7 from "../assets/prd7.png";
import prd8 from "../assets/prd8.png";
import DogProductCard from "../components/DogProductCard/DogProductCard";
import PetSellers from "../components/PetSellers/PetSellers";

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

const DummyDogProducts = [
  {
    imag: prd1,
    desc: "Reflex Plus Adult Dog Food Salmon",
    product: "Dog Food",
    size: "385gm",
    prix: 140000,
  },
  {
    imag: prd2,
    desc: "Reflex Plus Adult Cat Food Salmon",
    product: "Cat Food",
    size: "1.5kg",
    prix: 165000,
  },
  {
    imag: prd3,
    desc: "Cat Scratching Ball Toy Kitten Sisal Rope Ball",
    product: "Toy",
    prix: 11000000,
  },
  {
    imag: prd4,
    desc: "Cute Pet Cat Warm Nest",
    product: "Toy",
    prix: 410000,
  },
  {
    imag: prd5,
    desc: "NaturVet Dogs - Omega-Gold Plus Salmon Oil",
    product: "Dog Food",
    size: "385gm",
    prix: 350000,
  },
  {
    imag: prd6,
    desc: "Costumes Fashion Pet Clother Cowboy Rider",
    product: "Costume",
    size: "1.5kg",
    prix: 500000,
  },
  {
    imag: prd7,
    desc: "Costumes Chicken  Drumstick Headband",
    product: "Costume",
    prix: 400000,
  },
  {
    imag: prd8,
    desc: "Plush Pet Toy",
    product: "Toy",
    prix: 250000,
  },
];
function HomePage() {
  return (
    <div>
      <div className="colored">
        <div className="container">
          <Header></Header>
          <HeroSection></HeroSection>
        </div>
      </div>
      <div className="container">
        <TitleSection
          Title="Whats new?"
          Text="Take A Look At Some Of Our Pets"
          ButtonText="View more"
        ></TitleSection>
        <div className="dogsSection">
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
        <Button></Button>
        <FirstPoster></FirstPoster>
        <TitleSection
          Title="Hard to choose right products for your pets?"
          Text="Our Products"
          ButtonText="View more"
        ></TitleSection>

        <div className="dogsSection">
          {DummyDogProducts.map((item, index) => (
            <DogProductCard
              imag={item.imag}
              desc={item.desc}
              prix={item.prix}
              product={item.product}
              size={item.size}
              key={index}
            ></DogProductCard>
          ))}
        </div>

        <Button></Button>

        <PetSellers></PetSellers>

      </div>
    </div>
  );
}

export default HomePage;
