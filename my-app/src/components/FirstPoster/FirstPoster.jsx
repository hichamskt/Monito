import React from 'react'
import "../FirstPoster/FirstPoster.css"
import imag from "../../assets/girlkissdog.png"
import vid from "../../assets/Play.png"
function FirstPoster() {
  return (
    <div className='FirstPoster'>
        <div>
        <img src={imag} alt='dog Poster'></img>
        </div>
        <div className='Fpostertext'>
        <h1>One More Friend</h1>
        <h2>Thousands More Fun!</h2> 
            <p>Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun, we have 200+ diffrent pets that can meet your needs!</p>
            <div className='poster-btn'>
                <button>View Intro <img src={vid} alt='vid'></img></button>
                <button>Explore Now</button>
            </div>
        </div>
    </div>
  )
}

export default FirstPoster