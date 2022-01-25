import "../styles/components/navbar.css";
import { useState } from 'react';
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
          rf2Tracker
        </a>
      </div>
      <div className="nav-group">
      { !isUserLoggedIn() && 
        <div>
          <a className="nav-link" href="#">
            Features
          </a>
          <a className="nav-link" href="#">
            Pricing
          </a>
          <a className="nav-link" href="#">
            Contact
          </a>
        </div>
      }
      </div>
      { isUserLoggedIn() ?
        <div className="nav-group">
          <div class="sign-up-btn" onClick={() => navigate("/races")}>My races</div>
          <div class="log-out-btn" onClick={() => logOut()}>Log out</div>
        </div>
        :
        <div className="nav-group">
          <div class="sign-up-btn" onClick={() => navigate("/users/signup")}>Sign up</div>
        </div>
      }
    </div>
  )
}