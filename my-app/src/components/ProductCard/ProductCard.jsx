import React from 'react'
import "../ProductCard/ProductCard.css"
function ProductCard({ imag ,
    desc, 
    gene,
    age,
    prix}) {
  return (
    <div>
        <img src={imag} alt='dog'></img>
        <h3>{desc}</h3>
        <div>
            <p>Gene: <span>{gene}</span></p>
            <p>Age <span>{age}</span> Months</p>
        </div>
        <h3>{prix}<span>VND</span></h3>
    </div>
  )
}

export default ProductCard