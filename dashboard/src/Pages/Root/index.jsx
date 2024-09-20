import React, { useState } from 'react'
import "../../Styles/Root.css"
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router'


function Root() {
  const [showSideBar,setShowSideBar]=useState(true);

  return (
    <div className='rootpage'>
      <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      <Outlet  context={[setShowSideBar , showSideBar]}></Outlet>
    </div>
  )
}

export default Root