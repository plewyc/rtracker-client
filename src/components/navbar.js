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
        { isUserLoggedIn ? 
          <a className="nav-link" href="/races">
            Races
          </a>
        :
          <a className="nav-link" href="#">
            Features
          </a>
        }
      </div>
      { isUserLoggedIn() ? 
        <div className="nav-group">
          <div class="nav-btn-primary" onClick={() => logOut()}>Log out</div>
        </div>
        :
        <div className="nav-group">
          <div class="nav-btn" onClick={() => navigate("/users/login")}>Log in</div>
          <div class="nav-btn-primary" onClick={() => navigate("/users/signup")}>Sign up</div>
        </div>
      }
    </div>
  )
}