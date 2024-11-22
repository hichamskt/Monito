import React, { useEffect, useState } from "react";
import "../styles/Checkout.css";
import Header from "../components/Header/Header";
import { useAppContext } from "../AppContex";
import { LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";
import emptybox from "../assets/empty-box.png"
function CheckoutPage() {
  const { setShowCard, items, setItems, currency, rate } = useAppContext();

  

  return (
    <div className="container">
      <Header />

     {items?.length>0 ? <div className="checkout">
        <CheckoutCards
          items={items}
          rate={rate}
          currency={currency}
          setItems={setItems}
        />
        <CheckoutForm/>
      </div>: <div className="noprdctsselcted">
        <img  src={emptybox}></img>
        <p>No Products Were Selected</p>
        </div>}
    </div>
  );
}

export default CheckoutPage;

function CheckoutCards({ items, rate, currency, setItems }) {
  const [total, setTotal] = useState(
    items.reduce((total, item) => {
      return total + item.price * item.qnt;
    }, 0)
  );

  const convertPrice = (price) => {
    return (price * rate).toFixed(2);
  };
  useEffect(() => {
    const newTotal = items.reduce((total, item) => {
      return total + item.price * item.qnt;
    }, 0);
    setTotal(newTotal);
  }, [items]);
  

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
            <CheckoutCard item={item} key={index} setItems={setItems} />
          ))}
        </div>
      </div>
      <div className="pricetotle">
        <div className="contshoping">
          <Link to="/Products">
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
            <p>
              {convertPrice(total + 20)} {currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutCard({ item, setItems }) {
  

  const ttl = item.qnt * item.price;

  const hundleAddQnt = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.productSku === id ? { ...item, qnt: item.qnt + 1 } : item
      );
    });
  };
  const hundleMinusQnt = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.productSku === id ? { ...item, qnt: item.qnt - 1 } : item
      );
    });
  };
  const handleDeleteFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.productSku !== id));
  };

  return (
    <div className="checkoutProductcard">
      <div className="checkouimgbox">
        <img src={`${process.env.REACT_APP_BACKEND_URL}${item.url}`} alt="productimage"></img>
        <p>{item.porductName}</p>
      </div>
      <div className="checkoutqnt">
        <button
          disabled={item.qnt <= 1}
          onClick={() => hundleMinusQnt(item.productSku)}
        >
          -
        </button>
        <p>{item.qnt}</p>
        <button onClick={() => hundleAddQnt(item.productSku)}>+</button>
      </div>
      <p>{ttl}</p>
      <LuTrash onClick={() => handleDeleteFromCart(item.productSku)} />
    </div>
  );
}


function CheckoutForm(){
   return (<form className="checkoutForm">
        <h1>Contact Info,</h1>
        <div>
            <p>Full Name</p>
            <input type="text" placeholder=" Full Name" required ></input>
        </div>
        <div>
            <p>Phone Number</p>
            <input type="tel" placeholder="Phone Number"   required ></input>
        </div>
        <div>
            <p>Email</p>
            <input type="email" placeholder="example@gmali.com"   required ></input>
        </div>
        <div>
            <p>Adress</p>
            <input type="text" placeholder="Adress"   required ></input>
        </div>
        <button>Order</button>
    </form>)
}