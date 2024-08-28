import React from 'react'
import "../PetSellers/PetSellers.css"
import arrow from "../../assets/arrow.png"

import seller1 from "../../assets/seller1.png"
import seller2 from "../../assets/seller2.png"
import seller3 from "../../assets/seller3.png"
import seller4 from "../../assets/seller4.png"
import seller5 from "../../assets/seller5.png"
import seller6 from "../../assets/seller6.png"
import seller7 from "../../assets/seller7.png"
 

function PetSellers() {
  return (
    <div className='petseller'>
        <div className='petsellertext'>
        <h4>Proud to be part of &nbsp;<span>Pet Sellers</span></h4>
        <div className='btnn'>
        <button> View all our sellers &nbsp; <img src={arrow} alt='arrow'></img></button>
        </div>
        </div>
        <div className='petsellerImags'>
        <img src={seller1} alt="seller"></img>
        <img src={seller2} alt="seller"></img>
        <img src={seller3} alt="seller"></img>
        <img src={seller4} alt="seller"></img>
        <img src={seller5} alt="seller"></img>
        <img src={seller6} alt="seller"></img>
        <img src={seller7} alt="seller"></img>
       
        </div>
    </div>
  )
}

export default PetSellers