import React, { useEffect, useState } from "react";
import "../Cart/Cart.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { LuTrash } from "react-icons/lu";

import emptyCard from "../../assets/shopping-cart.png";
import { useAppContext } from "../../AppContex";
import { useNavigate } from "react-router-dom";

  



function Cart() {
  const { setShowCard ,items , setItems , currency ,  rate  } = useAppContext();
  const [total,setTotal] = useState(items.reduce((total, item) => {
    return total + item.price * item.qnt;
  }, 0))


  const Navigate = useNavigate();

  const convertPrice = (price) => {

    return (price * rate).toFixed(2); 
  };
  

  useEffect(() => {
    const newTotal = items.reduce((total, item) => {
      return total + item.price * item.qnt;
    }, 0);
    setTotal(newTotal);
  }, [items]);
  

  function hundleCheckout (){
    Navigate('/checkout');
    setShowCard(false);
  }

  return (
    <div className="Cart">
      <div className="cart-top">
        <p>Your Cart</p>
        <IoMdCloseCircleOutline onClick={()=>setShowCard(false)} />
      </div>
       {items.length===0 && <div className="emptycard">
        <img src={emptyCard} alt="emptycard" />
        <p>Votre panier est vide !</p>
      </div>} 
      {items.length>0 && <div className="cart-mid">
        {items.map((item, index) => (
          <CardItem key={index} product={item}  setItems={ setItems} currency={currency} convertPrice={convertPrice} />
        ))}
      </div>}
      {items.length>0 && <div className="cart-btm">
        <div className="ttl-line">
            <p>Subtotal:</p>
            <p>{convertPrice(total)} {currency} </p>
        </div>
        <div className="ttl-line">
            <p>Shipping :</p>
            <p>{convertPrice(20)} {currency}</p>
        </div>
        <div className="ttl-card">
            <p>Total :</p>
            <p>{convertPrice(total+20)} {currency}</p>
        </div>
      </div>}
      {items.length>0 && <button className="checkoutbtn" onClick={()=>hundleCheckout()} style={{cursor:"pointer"}}>Checkout</button>}
    </div>
  );
}

export default Cart;

function CardItem({product, setItems,currency ,convertPrice}) {
const [ttl,setTtl]=useState(product.qnt * product.price)
  const handleDeleteFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.productSku !== id));
  };

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
  
  return (
    <div className="carditem">

    <div className="carditem-top">
      <img  src={`http://localhost:5000/${product.url}`} alt="carditem"></img>
      <div className="card-item-info">
        <p>{product.productSku}</p>
        <p>{product.porductName}</p>
      </div>
      <LuTrash onClick={()=>handleDeleteFromCart(product.productSku)} />
    </div>
    <div className="carditem-bottum">
        <div className="card-item-qnt">
            <button disabled={product.qnt <= 1} onClick={()=>hundleMinusQnt(product.productSku)} >-</button>
            <span>{product.qnt}</span>
            <button onClick={()=>hundleAddQnt(product.productSku)}>+</button>
        </div>
        <p>{convertPrice(ttl)}{currency}</p>
    </div>
    </div>
  );
}
