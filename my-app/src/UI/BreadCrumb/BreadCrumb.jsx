import React from 'react'
import '../BreadCrumb/BreadCrumb.css'
import arrow from "../../assets/arrow.png"


function BreadCrumb({tring}) {
    

    let words = tring.split(" ")
   
  return (
    <div className='breadcrumber'>

    {
        words.map((item,index)=>(
            
            <div key={index} className='breadcrumberbox'>
            <p>{item}</p>
            {index !== words.length - 1 && <img src={arrow} alt="arrow" />}
          </div>
            
        ))
    }
    </div>
  )
}

export default BreadCrumb