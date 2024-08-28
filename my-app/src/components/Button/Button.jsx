import React from 'react'
import '../Button/Button.css'
import arrow from "../../assets/arrow.png"

function Button() {
  return (
    <div className='Button'>
        <button><p>View More</p> <img src={arrow} alt='arrow'></img>  </button>
    </div>
  )
}

export default Button