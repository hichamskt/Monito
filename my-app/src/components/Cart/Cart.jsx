import React from "react";
import "../Cart/Cart.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { LuTrash } from "react-icons/lu";

import emptyCard from "../../assets/shopping-cart.png";
import { useAppContext } from "../../AppContex";
const items = 
  [ {
    url:"",
    productName:"name",
    price:22,
    qnt:2,
    productUsk:"#aze"
   },
   {
    url:"",
    productName:"name",
    price:22,
    qnt:2,
    productUsk:"#aze"
   },]
  



function Cart() {
  const { setShowCard  } = useAppContext();

  return (
    <div className="Cart">
      <div className="cart-top">
        <p>Your Cart</p>
        <IoMdCloseCircleOutline onClick={()=>setShowCard(false)} />
      </div>
      {/* {<div className="emptycard">
        <img src={emptyCard} alt="emptycard" />
        <p>Votre panier est vide !</p>
      </div>} */}
      <div className="cart-mid">
        {items.map((item, index) => (
          <CardItem key={index} />
        ))}
      </div>
      <div className="cart-btm">
        <div className="ttl-line">
            <p>Subtotal:</p>
            <p>555 DH</p>
        </div>
        <div className="ttl-line">
            <p>Shipping :</p>
            <p>20 DH</p>
        </div>
        <div className="ttl-card">
            <p>Total :</p>
            <p>600 DH</p>
        </div>
      </div>
      <button className="checkout">Checkout</button>
    </div>
  );
}

export default Cart;

function CardItem() {
  return (
    <div className="carditem">

    <div className="carditem-top">
      <img src={emptyCard} alt="carditem"></img>
      <div className="card-item-info">
        <p>#uaze</p>
        <p>Authority Everyday Indoor Cat Dry</p>
      </div>
      <LuTrash />
    </div>
    <div className="carditem-bottum">
        <div className="card-item-qnt">
            <button>-</button>
            <span>1</span>
            <button>+</button>
        </div>
        <p>220Dh</p>
    </div>
    </div>
  );
}
