import React, { useState } from 'react'
import "../Styles/DashBoard.css"
import { MdOutlineDashboard } from "react-icons/md";
import OverviewCard from '../Components/OverviewCard/OverviewCard';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { RiPagesLine } from "react-icons/ri";

import { MdMenuOpen } from "react-icons/md";
import { useOutletContext } from "react-router-dom";



function DashBoard() {
  const [setShowSideBar] = useOutletContext();
const data = [1,2,3,4,5]
  return (
    <div className='dashboard'>
      <div className='dash'>
      <div className='icon' onClick={()=>setShowSideBar(true)}><MdMenuOpen /></div>
      <h2 >DashBoard</h2>

      </div>
      <div className='overviewSection'>
      <div className='overview'>
      <MdOutlineDashboard/>
      <h2>Overview</h2>
      </div>
      <div className='overviewCards'>
        <OverviewCard title="Monthly Profite" totale="£92,405" > <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits></OverviewCard>
        <OverviewCard title="Totale Profite" totale="£32,405" > <FiDollarSign /></OverviewCard>
        <OverviewCard title="New Order" totale="298" > <CgProfile /></OverviewCard>
      </div>
         
      <div className='overview'>
        <RiPagesLine/>
        <h2>Latest Orders</h2>
        </div>  
      </div>
      <div className='latestOrders'>
      <table>
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Order Value</th>
        <th>Order Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
    { 
      data.map((item,index)=>(
        <tr>
          <td>name name</td>
          <td>1002 dh</td>
          <td>20/08/2024</td>
          <td><span>New</span></td>
        </tr>
      ))
    }
    </tbody>
    </table>
      </div>
      
    </div>
  )
}

export default DashBoard