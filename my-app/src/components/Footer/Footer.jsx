import React from 'react'
import "../Footer/Footer.css"
import fb from "../../assets/fb.png"
import twiter from "../../assets/twiter.png"
import insta from "../../assets/insta.png"
import youtube from "../../assets/youtube.png"
import logo from "../../assets/Frame.png"

function Footer() {
  return (
    <div className='footer colored '>
      <div className='container'>

        <div className='subscribesection'>
            <h2>Register now so you don't miss our programs</h2>
            <div className='inputsub'>
                <input placeholder='Enter your Email'></input>
                <button>Subcribe Now</button>
            </div>
        </div>

        <div className='menuendsocials'>
          <div >
            <ul>
              <li>Home</li>
              <li>Category</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className='socials'>
            <a href='#'><img src={fb} alt='scm'></img></a>
            <a href='#'><img src={twiter} alt='scm'></img></a>
            <a href='#'><img src={insta} alt='scm'></img></a>
            <a href='#'><img src={youtube} alt='scm'></img></a>
            
          </div>
        </div>
        <hr></hr>
        
        <div className='rightndterms'>
      <p>© 2022 Monito. All rights reserved.</p>
      <img src={logo} alt='logo'></img>
      <div className='terms'>
        <a href='#'>
          <p>Terms of Service </p>
          </a>
          <a href='#'>

        <p>Privacy Policy</p>
          </a>
      </div>
        </div>
      </div>
        
    </div>
  )
}

export default Footer