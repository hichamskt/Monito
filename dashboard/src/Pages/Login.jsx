import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import axios from 'axios';
import Loading from "../UI/Loading/Loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    if(email=== "") return 0
    if(password===""){
      setError("Password rquired");
      return 0;
    }
       try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        password,
        email,
      }, {
        withCredentials: 'true', 
      });
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setIsLoading(true);
        setTimeout(()=>{
          navigate("/");
        },3000) }
      
      
    } catch (error) {
       if (error.response && error.response.data && error.response.data.message) {
        console.error('error12:', error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  


  return (
    <div className="LoginPage">
      <img src={logo} alt="logo" className="logo"></img>
      {isLoading ?
      <Loading />
      :<form>
        <h2>Welcome Back 👋</h2>
        <div className="login-input-grp">
          <span>Email:</span>
          <div className="login-input">
            <MdOutlineMailOutline  />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="login-input-grp">
          <span>Password</span>
          <div className="login-input">
            <MdOutlineLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="login-fpw-sec">
          <div className="login-fpw-kl">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1"> Keep me Logged in </label>
          </div>
          <NavLink to="/forgetpassword">Forgot Password?</NavLink>
        </div>
        {error && <p style={{color:"red"}}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </form>}
    </div>
  );
}

export default Login;
