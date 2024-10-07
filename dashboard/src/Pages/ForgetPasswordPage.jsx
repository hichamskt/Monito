import React from 'react'
import imgg from "../assets/undraw_mailbox_re_dvds.svg"
import "../Styles/ForgetPasswordPage.css"
import { NavLink } from "react-router-dom";
function ForgetPasswordPage() {
  return (
    <div className='forgetPassword'>
        <div className='fg-div'>

        <img src={imgg} alt='mail'></img>
        <h2>Forgot your password?</h2>
        <button>Send Email</button>
        <NavLink to="/login" >&lt; Back to Login </NavLink>
        </div>
        </div>
  )
}

export default ForgetPasswordPage