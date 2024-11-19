import React from 'react'
import '../TitleSection/TitleSection.css'
import arrow from "../../assets/arrow.png"
import { useNavigate } from "react-router-dom";

function TitleSection({Title,Text,ButtonText,linktonavigate}) {
  const navigate = useNavigate();
  const goTo = () => {
    navigate(linktonavigate);
  };
  return (
    <div className='TitleSection'>
        <div className='textdiv'>
        <h4>{Title}</h4>
        <h2>{Text}</h2>
        </div>
        <div>

        <button onClick={goTo}>{ButtonText} &nbsp; <img src={arrow} alt='arrow' ></img></button>
        </div>
    </div>
  )
}

export default TitleSection