import React, { useState } from 'react'
import Header from '../components/Header/Header'
import '../styles/ProductPage.css'
import prd from "../assets/prd2.png"

function ProductPage() {
  const [quant,setquant]=useState(1);
  return (
    <div className="container">
        <Header></Header>
        <div className='productitem'>
         <img src={prd} alt='produit' className='prdctimage'></img>   
        <div className='producttext'>
        <h4>#aaa23</h4>
        <h2>Hill Science Weight Cat Food</h2>
        <h3>280 DH</h3>
        <div className='qntAddToCard'>
          <div className='quantt'>
          <button disabled={quant <= 1}  onClick={() => setquant(quant - 1)}>-</button>
            <span>{quant}</span>
            <button onClick={()=>setquant(quant+1)}>+</button>
          </div>
          <button className='addtocard'>Add To Cart</button>
        </div>
        <table>
        <tbody>
        <tr>
          <td>SKU</td>
          <td>#1000078</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>Availabel</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>Cat Food</td>
        </tr>
        <tr>
          <td>Weigth</td>
          <td>2gm</td>
        </tr>
        <tr>
          <td>Weigth</td>
          <td>2gm</td>
        </tr>

        </tbody>

        </table>
        </div>
        </div>
    </div>
  )
}

export default ProductPage