import "../../styles/users/login.css";
import {useState, useEffect} from "react";

export default function Login() {

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
    .then(res => localStorage.setItem('rtracker-jwt-token', res.token));
  }

  return (
    <div>
      <h1 className="form-title">Login</h1>
      <div className="form-container">
        <div className="form-label">Username</div>
        <input id="login-username" className="form-text" type="text" />
        <div className="form-label">Password</div>
        <input id="login-password" className="form-text" type="text" />
        <div className="form-submit" onClick={() => handleLogin()}>Login</div>
      </div>
    </div>
  )
}