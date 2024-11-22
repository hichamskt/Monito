import React, { useState } from "react";
import "../styles/Checkout.css";
import Header from "../components/Header/Header";
import { useAppContext } from "../AppContex";
import { LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";

function CheckoutPage() {
  const { setShowCard, items, setItems, currency, rate } = useAppContext();


  return (
    <div className="container">
      <Header />

      <div className="checkout">
        <CheckoutCards items={items} rate={rate} currency={currency} setItems ={setItems } />
        <div></div>
      </div>
    </div>
  );
}

export default CheckoutPage;

function CheckoutCards({ items , rate , currency,setItems  }) {

    const [total,setTotal] = useState(items.reduce((total, item) => {
        return total + item.price * item.qnt;
      }, 0))

      const convertPrice = (price) => {

        return (price * rate).toFixed(2); 
      };


  return (
    <div className="checkoutcards">
      <h1>Shopping Card.</h1>
      <div className="shopingProducts">
        <div className="shopingtop">
          <p>Products</p>
          
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        <div className="shopingproductsCard">
          {items.map((item, index) => (
            <CheckoutCard item={item} key={index} setItems={setItems } />
          ))}
        </div>
      </div>
      <div className="pricetotle">
          <div className="contshoping">
            <Link to='/Products'>
            <p> &lt; Continue shoppping </p>
            </Link>
          </div>
          <div className="calcttl">
            <div className="calcttlline">
                <p>Subtotal</p>
                <p>{total}</p>
            </div>
            <div className="calcttlline">
                <p>Shipping</p>
                <p>{convertPrice(20)}</p>
            </div>
            <div className="calcttotale">
                <p>Total</p>
                <p>{convertPrice(total+20)} {currency}</p>
            </div>
          </div>
      </div>
    </div>
  );
}

function CheckoutCard({ item , setItems  }) {
  const [ttl, setTtl] = useState(item.qnt * item.price);

  const hundleAddQnt = (id) => {
    setItems((prevItems) => {
     
     return prevItems.map((item) =>
       item.productSku === id
         ? { ...item, qnt: item.qnt + 1 }
         : item
     );
   
 });
   
 }
 const hundleMinusQnt = (id) => {
    setItems((prevItems) => {
     return prevItems.map((item) =>
       item.productSku === id
         ? { ...item, qnt: item.qnt - 1 }
         : item
     );
   
 });
   

 }
 const handleDeleteFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.productSku !== id));
  };

  return (
    <div className="checkoutProductcard">
        <div className="checkouimgbox">

      <img src={`http://localhost:5000/${item.url}`} alt="productimage"></img>
      <p>{item.porductName}</p>
        </div>
      <div className="checkoutqnt">
        <button disabled={item.qnt <= 1} onClick={()=> hundleMinusQnt(item.productSku)}>-</button>
        <p>{item.qnt}</p>
        <button onClick={()=>hundleAddQnt(item.productSku)}>+</button>
      </div>
      <p>{ttl}</p>
      <LuTrash  onClick={()=>handleDeleteFromCart(item.productSku)} />    
    </div>
  );
}
