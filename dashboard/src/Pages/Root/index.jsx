import React from 'react'
import "../../Styles/Root.css"
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router'


function index() {
  return (
    <div className='rootpage'>
      <SideBar/>
      <Outlet></Outlet>
    </div>
  )
}

export default index