import React, { useState } from "react";
import "../styles/Checkout.css";
import Header from "../components/Header/Header";
import { useAppContext } from "../AppContex";

function CheckoutPage() {
  const { setShowCard, items, setItems, currency, rate } = useAppContext();

  return (
    <div className="container">
      <Header />

      <div className="checkout">
        <CheckoutCards items={items} />
      </div>
    </div>
  );
}

export default CheckoutPage;

function CheckoutCards({ items }) {
  return (
    <div>
      <h1>Shopping Card.</h1>
      <div className="shopingProducts">
        <div className="shopingtop">
          <p>Products</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        <div className="shopingproductsCard">
          {items.map((item, index) => (
            <CheckoutCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckoutCard({ item }) {
  const [ttl, setTtl] = useState(item.qnt * item.price);

  return (
    <div className="checkoutProductcard">
      <img src={`http://localhost:5000/${item.url}`} alt="productimage"></img>
      <p>{item.porductName}</p>
      <div className="checkoutqnt">
        <button>-</button>
        <p>{item.qnt}</p>
        <button>+</button>
      </div>
      <p>{ttl}</p>
    </div>
  );
}
