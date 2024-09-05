import React from 'react'
import "../CategoryCatPoster/CategoryCatPoster.css"
import imag from "../../assets/catgrp.png"
function CategoryCatPoster() {
  return (
    <div className='categoryDogPoster'>
    <div className='imgside'>
      <img src={imag} alt='doggrpupe'></img>
    </div>
    <div className='textside'>
      <h2>A New Friend</h2>
      <h3>Infinite Joy!</h3>
      <p>Welcoming a pet into your life means opening the door to endless happiness and companionship. With over 200 pets ready to find their forever homes, you’ll discover a loyal friend who will bring laughter, love, and countless joyful moments to your everyday life!</p>
    </div>
  </div>
  )
}

export default CategoryCatPoster