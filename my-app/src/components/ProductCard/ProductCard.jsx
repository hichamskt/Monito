import React from 'react'
import "../ProductCard/ProductCard.css"
function ProductCard({ imag ,
    desc, 
    gene,
    age,
    prix}) {

  return (
    <div className='ProductCard'>
        <img src={imag} alt='dog'></img>
        <h3>{desc}</h3>
        <div className='productageInfo'>
            <p>Gene:&nbsp; <span>{gene}</span></p>
            <p>Age:&nbsp; <span>{age}</span> Months</p>
        </div>
        <h3>{prix.toLocaleString('en-US')}<span>&nbsp;VND</span></h3>
    </div>
  )
}

export default ProductCard