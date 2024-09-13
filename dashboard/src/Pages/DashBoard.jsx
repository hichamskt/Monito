import React from 'react'
import "../Styles/DashBoard.css"
import { MdOutlineDashboard } from "react-icons/md";

function DashBoard() {
  return (
    <div>
      <h2>DashBoard</h2>
      <div className='overviewSection'>
      <div className='overview'>
      <MdOutlineDashboard/>
      <h2>Overview</h2>
      </div>
      
      </div>
    </div>
  )
}

export default DashBoard