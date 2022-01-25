import "../../styles/users/login.css";
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar";

export default function Login() {
  const navigate = useNavigate();

  const apiHost = () => {
    const host = "https://rf2tracker.herokuapp.com";
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
    <div className="img-background">
      <div className="container-auth">
      <Navbar />
      <div style={{height: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="login-container">
          <div style={{marginTop: "2.2rem"}}>
            <h1 className="form-title">Sign in</h1>
            <p className="sign-up-text">Don't have an account yet? <a href="/users/signup">Sign in</a></p>
            <div className="form-container">
              <input id="login-username" className="form-text" type="text" placeholder="Username" />
              <input id="login-password" className="form-text" type="password" placeholder="Password" />
              <div className="form-submit" onClick={() => handleLogin()}>Sign in</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}