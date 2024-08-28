import React from "react";
import "../DogProductCard/DogProductCard.css";
import gift from "../../assets/gift.png";

function DogProductCard({ imag, desc, prix, product, size }) {
  return (
    <div className="ProductCard">
      <img src={imag} alt="dogprd"></img>
      <h3>{desc}</h3>
      <div className="productageInfo">
        <p>
          Product:&nbsp; <span>{product}</span>
        </p>
        {size ? (
          <p>
            Size:&nbsp; <span>{size}</span>
          </p>
        ) : (
          ""
        )}
      </div>
      <h3>
        {prix.toLocaleString("en-US")}
        <span>&nbsp;VND</span>
      </h3>
      <div className="giftbox">
        <div>
          <img src={gift} alt="gift" />
        </div>
        <p>&nbsp;• &nbsp; &nbsp; &nbsp; {size ? "Free Toy & Free Shaker" : "Free Cat Food"} </p>
      </div>
    </div>
  );
}

export default DogProductCard;
