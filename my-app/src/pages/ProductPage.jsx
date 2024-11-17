import React from 'react'
import Header from '../components/Header/Header'
import prd from "../assets/prd2.png"

function ProductPage() {
  return (
    <div className="container">
        <Header></Header>
        <div className='productitem'>
         <img src={prd} alt='produit'></img>   

        </div>
    </div>
  )
}

export default ProductPage