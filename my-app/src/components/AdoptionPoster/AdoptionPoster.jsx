import React from 'react'
import "../AdoptionPoster/AdoptionPoster.css"
import paw from '../../assets/paw.png'
import paw1 from '../../assets/paw2.png'
import vid from "../../assets/Play.png"
function AdoptionPoster() {
  return (
    <div className='AdoptionPoster'>
      <div className='adoptiontextside'>

      <span><h1>Adoption</h1> <img src={paw} alt="paw"></img></span>
      <h2>We Need Help. So Do They.</h2>
      <div>

      <p>Adopt a pet and give it a home.</p>
      <p>it will love you back uncondianally.</p>
      </div>
      <div className='adoptionButtons'>
      <button>View Intro <img src={vid} alt='vid'></img></button>
      <button>Explore Now</button>
      </div>
      </div>
      <div className='adoptionimgside'>
      <img src={paw1} alt='doghand'></img>
      </div>
    </div>
  )
}

export default AdoptionPoster