import React from "react";
import "../styles/HomePage.css";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";

function HomePage() {
  return (
    <div>
        <div className="colored">

      <div className="container ">
        <Header></Header>
        <HeroSection></HeroSection>
      </div>
        </div>
    </div>
  );
}

export default HomePage;
