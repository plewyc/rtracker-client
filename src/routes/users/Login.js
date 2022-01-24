import "../../styles/users/login.css";
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar";

export default function Login() {
  const navigate = useNavigate();

  const apiHost = () => {
    const host = process.env.NODE_ENV === 'production' ?  "https://rf2tracker.herokuapp.com" : "http://localhost:3000";
    return host;
  }

  const handleLogin = () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    fetch(`${apiHost()}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('rtracker-jwt-token', res.token);
      console.log(res);
      return res;
    })
    .then(res => navigate(`/users/${res.user_id}`));
  }

  return (
    <>
    <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url("https://cdn.cloudflare.steamstatic.com/steam/apps/365960/ss_08014c715e90c851212e829d60dbbba7c5f0fc43.1920x1080.jpg?t=1641889847")`}}>
      <div className="login-container">
        <div>
          <h1 className="form-title">Login</h1>
          <p className="sign-up-text">No account yet? <a href="/users/signup">Sign up</a></p>
          <div className="form-container">
            <div className="form-label">Username</div>
            <input id="login-username" className="form-text" type="text" placeholder="Username" />
            <div className="form-label">Password</div>
            <input id="login-password" className="form-text" type="password" placeholder="Password" />
            <div className="form-submit" onClick={() => handleLogin()}>Login</div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}