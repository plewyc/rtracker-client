import "../../styles/users/login.css";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const apiHost = () => {
    const host = process.env.NODE_ENV === 'production' ?  "https://rf2tracker.herokuapp.com" : "http://localhost:3000";
    return host;
  }

  const handleLogin = () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const passwordConfirmation = document.getElementById("login-password-confirmation").value;

    fetch(`${apiHost()}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          password_confirmation: passwordConfirmation
        }
      })
    })
    .then(res => res.json())
    .then(() => navigate('/races'));
  }

  return (
    <>
    <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url("https://cdn.cloudflare.steamstatic.com/steam/apps/365960/ss_08014c715e90c851212e829d60dbbba7c5f0fc43.1920x1080.jpg?t=1641889847")`}}>
      <div className="login-container">
        <div>
      <h1 className="form-title">Sign up</h1>
      <p className="sign-up-text">Already have an account? <a href="/users/signup">Sign in</a></p>
      <div className="form-container">
        <div className="form-label">Username</div>
        <input id="signup-username" className="form-text" type="text" placeholder="Username" />
        <div className="form-label">Password</div>
        <input id="signup-password" className="form-text" type="password" placeholder="Password" />
        <div className="form-label">Password confirmation</div>
        <input id="signup-password-confrimation" className="form-text" type="password" placeholder="Confirm password" />
        <div className="form-submit" onClick={() => handleLogin()}>Sign up</div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}