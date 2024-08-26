import React, { useState } from "react";
import "../Header/headerStyle.css";
import Logo from "../../assets/Frame.png";
import { HiCurrencyYen } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMediaQuery } from 'react-responsive';
import { IoIosExit } from "react-icons/io";

function Header() {
const [showSearch,setShowSearch]=useState(false);
const [showSideBar,setShowSideBar]=useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 846px)' });


  return (
    <div className="header">
      <GiHamburgerMenu className="humb" onClick={()=>setShowSideBar(true)} style={{display: showSideBar?'none':'' }}></GiHamburgerMenu>
      <img src={Logo} alt="Logo" className="logo"></img>
      <div className="nav">
        <ul>
          <li>Home</li>
          <li>Category</li>
          <li>About</li>
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
        
      <select id="fruit" name="fruit" className="opt">
        <option value="apple">  VND</option>
        <option value="banana">    Banana</option>
      </select>
      </div>
      <div className="sidebar" style={{left: showSideBar? '0' : ''}}>
      <IoIosExit  onClick={()=>setShowSideBar(false)}/>

      <ul>
          <li>Home</li>
          <li>Category</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="sidejoinbtn">Join the community</button>
        <select id="fruit" name="fruit" className="sideopt">
        <option value="apple">  VND</option>
        <option value="banana">    Banana</option>
      </select>
      </div>
    </div>
  );
}

export default Header;
