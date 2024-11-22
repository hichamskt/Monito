import React, { useEffect, useState } from "react";
import "../Header/headerStyle.css";
import Logo from "../../assets/Frame.png";
import { HiCurrencyYen } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMediaQuery } from 'react-responsive';
import { IoIosExit } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../AppContex";

function Header() {
const [showSearch,setShowSearch]=useState(false);
const [showSideBar,setShowSideBar]=useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 846px)' });
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("currency") || "MAD");
  const [exchangeRates, setExchangeRates] = useState({});
  const { setcurrency ,  setRate } = useAppContext();
  
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  

  const convertPrice = (price) => {
    const rate = exchangeRates[selectedCurrency] || 1;
    return (price * rate).toFixed(2); 
  };

  const hundleSelectedCurrency =(e)=>{
    setcurrency(e.target.value);
    setSelectedCurrency(e.target.value)
    const rate = exchangeRates[e.target.value] || 1;
    setRate(rate);
    localStorage.setItem("rate", rate);
    localStorage.setItem("currency", e.target.value);
  }
  

  return (
    <div className="header">
      <GiHamburgerMenu className="humb" onClick={()=>setShowSideBar(true)} style={{display: showSideBar?'none':'' }}></GiHamburgerMenu>
      <img src={Logo} alt="Logo" className="logo"></img>
      <div className="nav">
        <ul>
          
          <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/category"><li>Category</li></NavLink>
          <NavLink to="/about"><li>About</li></NavLink>
          <li>Contact</li>
        </ul>
      </div>
      <div className="search"  style={{backgroundColor: (isSmallScreen && showSearch) ? 'white' : ''  }}>
        <FaSearch onClick={()=>setShowSearch(!showSearch)}></FaSearch>
        <input type="text"  placeholder="Search Somthing here! " style={{ display: (isSmallScreen && showSearch) ? 'block' : 'none' }}></input>
      </div>
      <div className="selc" style={{ display: (isSmallScreen && showSearch) ? 'none' : '', } }>

      <button className="joinbtn">Join the community</button>
      </div>

      <div className="selc">
        
      <select  name="currency" className="opt" id="currency"
        value={selectedCurrency}
        onChange={(e) => hundleSelectedCurrency(e)}>
        <option value="VND">  VND</option>
        <option value="MAD">  MAD</option>
        <option value="CAD">  CAD</option>
        <option value="CNY">  CNY</option>
      </select>
      </div>
      <div className="sidebar" style={{left: showSideBar? '0' : ''}}>
      <IoIosExit  onClick={()=>setShowSideBar(false)}/>

      <ul>
      <NavLink to="/"><li>Home</li></NavLink>
          <NavLink to="/category"><li>Category</li></NavLink>
          <NavLink to="/about"><li>About</li></NavLink>
          <li>Contact</li>
        </ul>
        <button className="sidejoinbtn">Join the community</button>

      <select  name="currency" className="sideopt" id="currency"
        value={selectedCurrency}
        onChange={(e) => hundleSelectedCurrency(e)}>
        <option value="VND">  VND</option>
        <option value="MAD">  MAD</option>
        <option value="CAD">  CAD</option>
        <option value="CNY">  CNY</option>
      </select>
      </div>
    </div>
  );
}

export default Header;
