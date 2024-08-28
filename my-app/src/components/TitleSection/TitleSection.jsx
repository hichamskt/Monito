import React from 'react'
import '../TitleSection/TitleSection.css'
import arrow from "../../assets/arrow.png"

function TitleSection({Title,Text,ButtonText}) {
  return (
    <div className='TitleSection'>
        <div className='textdiv'>
        <h4>{Title}</h4>
        <h2>{Text}</h2>
        </div>
        <div>

        <button>{ButtonText} &nbsp; <img src={arrow} alt='arrow'></img></button>
        </div>
    </div>
  )
}

export default TitleSection