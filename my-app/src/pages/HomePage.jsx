import React from "react";
import "../styles/HomePage.css";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import TitleSection from "../components/TitleSection/TitleSection";

function HomePage() {
  return (
    <div>
        <div className="colored">

      <div className="container ">
        <Header></Header>
        <HeroSection></HeroSection>
      </div>
        </div>
        <div className="container">
        <TitleSection Title="Whats new?" Text="Take A Look At Some Of Our Pets" ButtonText="View more"></TitleSection>
        </div>
    </div>
  );
}

export default HomePage;
