import React from 'react'
import "../CategoryCard/CategoryCard.css"

function CategoryCard({imag , disc}) {
  return (
    <div className='categorycard'>
        <img src={imag} alt="dogimg" />
        <p>{disc}</p>
    </div>
  )
}

export default CategoryCard