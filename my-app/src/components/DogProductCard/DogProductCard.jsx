import React from "react";
import "../DogProductCard/DogProductCard.css";
import gift from "../../assets/gift.png";
import { useAppContext } from "../../AppContex";

function DogProductCard({ imag, desc, prix, product, size ,sizeUnit }) {
  
  const { currency ,  rate } = useAppContext();

  const convertPrice = (price) => {

    return (price * rate).toFixed(2); 
  };
  

  return (
    <div className="ProductCard">
      <img src={`${process.env.REACT_APP_BACKEND_URL}${imag[0]?.url}`} alt="dogprd"></img>
      <h3>{desc}</h3>
      <div className="productageInfo">
        <p>
          Product:&nbsp; <span>{product}</span>
        </p>
        {size ? (
          <p>
            Size:&nbsp; <span>{size}{sizeUnit}</span>
          </p>
        ) : (
          ""
        )}
      </div>
      <h3>
        {convertPrice(prix)}
        <span>&nbsp;{currency}</span>
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
