import "../../styles/users/login.css";
import {useState, useEffect} from "react";

export default function Signup() {

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
    .then(res => console.log(res));
  }

  return (
    <div>
      <h1 className="form-title">Login</h1>
      <div className="form-container">
        <div className="form-label">Username</div>
        <input id="signup-username" className="form-text" type="text" />
        <div className="form-label">Password</div>
        <input id="signup-password" className="form-text" type="text" />
        <div className="form-label">Password confirmation</div>
        <input id="signup-password-confrimation" className="form-text" type="text" />
        <div className="form-submit" onClick={() => handleLogin()}>Sign up</div>
      </div>
    </div>
  )
}