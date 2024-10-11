import React, { useState } from 'react'
import imgg from "../assets/undraw_mailbox_re_dvds.svg"
import "../Styles/ForgetPasswordPage.css"
import { NavLink } from "react-router-dom";
import axios from 'axios';

function ForgetPasswordPage() {
  const [emailSent,setEmailSent]=useState(true);

  const hundleSendMail = async (e)=>{

         try {
         await axios.post('http://localhost:5000/api/user/sendemail');
         
        setEmailSent(true);
      } catch (error) {
         if (error) {
          console.log("error",error)
        } 
      }
    
  

  }
  return (
    <div className='forgetPassword'>
        <div className='fg-div'>

        <img src={imgg} alt='mail'></img>
        <h2>Forgot your password?</h2>
        {emailSent ? (<p>Email Has been sent Please Check your Email</p>) : (<button onClick={hundleSendMail}>Send Email</button>)}
        <NavLink to="/login" >&lt; Back to Login </NavLink>
        </div>
        </div>
  )
}

export default ForgetPasswordPage