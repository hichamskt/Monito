import React from "react";
import Logo from "../../assets/Logo.png";
import "../SideBar/SideBar.css";

import { MdOutlineDashboard } from "react-icons/md";
import { LiaDogSolid } from "react-icons/lia";
import { LiaCatSolid } from "react-icons/lia";
import { AiOutlineProduct } from "react-icons/ai";
import { BsBorderStyle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { GoSidebarExpand } from "react-icons/go";
import { NavLink } from "react-router-dom";

function SideBar({setShowSideBar,showSideBar}) {
  
  return (
    <div className="sidebar" style={showSideBar ? { left: 0 } : {}}>
      <div className="expandSidebar" onClick={()=>setShowSideBar(false)}>
      <GoSidebarExpand></GoSidebarExpand>

      </div>
      <div>
        <img src={Logo} alt="logo"></img>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <MdOutlineDashboard />
              <h4>DashBoard</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dogs">
              <LiaDogSolid></LiaDogSolid>
              <h4>Dogs</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cats">
              <LiaCatSolid></LiaCatSolid>
              <h4>Cats</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <AiOutlineProduct />
              <h4>Products</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders">
              <BsBorderStyle />
              <h4>Orders</h4>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="logout">
        <h4>LogOut</h4>
        <IoMdLogOut></IoMdLogOut>
      </div>
    </div>
  );
}

export default SideBar;
