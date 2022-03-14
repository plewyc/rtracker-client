import "../styles/components/navbar.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../helpers/authentication';

export default function Navbar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('rtracker-jwt-token');
    navigate("/");
  }

  return (
    <div className="nav-container">
      <div className="nav-group">
        <a className="nav-link" href="/">
          rTracker
        </a>
      </div>
      { isUserLoggedIn() ?
        <div className="nav-group">
          <div className="sign-up-btn" onClick={() => navigate("/races")}>My races</div>
          <div className="log-out-btn" onClick={() => logOut()}>Log out</div>
        </div>
        :
        <div className="nav-group">
          <div className="nav-link" style={{marginRight: "1rem"}} onClick={() => navigate("/users/login")}>Sign in</div>
          <div className="sign-up-btn" onClick={() => navigate("/users/signup")}>Sign up</div>
        </div>
      }
    </div>
  )
}