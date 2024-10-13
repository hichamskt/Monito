import React, { useState } from 'react'
import "../Styles/RessetPassword.css"
import logo from "../assets/Logo.png"
import imgg from "../assets/undraw_envelope_re_f5j4.svg"
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import Loading from '../UI/Loading/Loading';

function RessetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [borderColor,setBorderColor]=useState('')
    const [ar,setAr]=useState([])
    const [err,setErr]=useState("");
    const [loading,setLoading]=useState(false);

    const { userId } = useParams();  
    const navigate = useNavigate();

    function validatePassword(password) {
        if(password === ""){
            setAr([]);
            setBorderColor("")
            return ""
        }
        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
    
        if (/[a-z]/.test(password)) score += 1;  
        if (/[A-Z]/.test(password)) score += 1;  
        if (/\d/.test(password)) score += 1;     
        if (/[@$!%*#?&]/.test(password)) score += 1;  
    
        
        if (/^(.)\1{2,}/.test(password)) score -= 1; 
    
        const commonPatterns = ["12345", "password", "qwerty", "abcdef"];
        if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
            score -= 2;  
        }
    
        if (score <= 2) {
            setBorderColor('red');
            setAr([1])
            return "Weak";
        } else if (score <= 4) {
            setBorderColor('orange')
            setAr([1,2])
            return "Good";
        } else if (score <= 6) {
            
            setAr([1,2,2])
            setBorderColor('green')
            return "Strong";
        } else {
            setAr([1,2,2,3])
            
            setBorderColor('blue')
            return "Excellent";
        }
    }
    
    const hundleSubmit = async (e)=>{

        e.preventDefault()
        if(password !== confirmPassword){
            setErr("password not matching");
            return ;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/user/${userId}/resetPassword`, {
              password,
            }, {
              withCredentials: 'true', 
            });
            if (response.status === 200) {
              setLoading(true);
              setTimeout(()=>{
                navigate("/login");
                
              },3000) }
            
            
          } catch (error) {
             setErr("An error has occurred, please try again later")
          }

    }
    
    

    const HundlePassword = (e)=>{
        setPassword(e.target.value);
        if(e.target.value === confirmPassword) setErr("")
        setPasswordStrength(validatePassword(e.target.value))
    }
    const hundleconfirmPasswor = (e) =>{
        setconfirmPassword(e.target.value);
        if(password === e.target.value) setErr("")
       else if(password !== e.target.value) setErr("password not matching");
    }

  return (
    <div className='ressetpasswor'>
        <img src={logo} alt='logo' className='logo'></img>
        {loading ?
        <Loading /> 
           : <div className='rest-sec'>
            <div className='rest-top-sec'>
            <img src={imgg} alt='email'></img>
            <h1>Reset Password</h1>
            <p>Please Kindly set your new password</p>
            </div>
            
            <div className='restpsswgrp'>
                <div className='rest-inpu-group'>
                    <p>New Password</p>
                    <div className='rst-input' style={{borderColor:borderColor}}>
                        <input type='password' value={password} onChange={(e)=>HundlePassword(e)} ></input>
                        <IoIosCheckmarkCircleOutline />
                    </div>
                    <div className='rest-psdd'> 
                    {ar.map((item , index)=>(
                        <div className='box' style={{backgroundColor:borderColor}}></div>
                    ))}
                    </div>
                    {password && <p className='pswd-strngt'>password Strength : <span style={{color:borderColor}} >{passwordStrength}</span></p>}
                </div>
                <div className='rest-inpu-group'>
                    <p>Re-enter Password</p>
                    <div className='rst-input'>
                        <input type='password' value={confirmPassword} onChange={(e)=>hundleconfirmPasswor(e)} ></input>
                        
                    </div>
                    {err&&<p style={{color:"red" , marginTop:"10px"}}>{err}</p>}
                </div>
                <button onClick={hundleSubmit}>Reset Password</button>
            </div>
        </div>}
    </div>
  )
}

export default RessetPassword