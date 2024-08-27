import React from 'react'
import '../HeroSection/HeroSection.css'
import vid from "../../assets/Play.png"
import secimag from '../../assets/sectionimg.png'
function HeroSection() {
  return (
    <div className='herosection'>
      <div className='bo'></div>
        <div className='secleft'>
            <h1><span className='o'>O</span><span className='ne'>ne</span> More Friend</h1>
            <h2>Thousands More Fun!</h2>
            <p>Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun, we have 200+ diffrent pets that can meet your needs!</p>
            <div className='hero-btn'>
                <button>View Intro <img src={vid} alt='vid'></img></button>
                <button>Explore Now</button>
            </div>
        </div>
        <div className='imgSection'>
            <img src={secimag} alt='happy person holidn a dog'></img>
        </div>
    </div>
  )
}

export default HeroSection