import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
    }
  };

  return (
    <div className="LoginPage">
      <img src={logo} alt="logo" className="logo"></img>
      <form>
        <h2>Welcome Back 👋</h2>
        <div className="login-input-grp">
          <span>Email:</span>
          <div className="login-input">
            <MdOutlineMailOutline  />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <label for="vehicle1"> Keep me Logged in </label>
          </div>
          <NavLink to="/forgetpassword">Forgot Password?</NavLink>
        </div>
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
