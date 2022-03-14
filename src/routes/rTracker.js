import Navbar from "../components/navbar";
import "../styles/rTracker.css";
import { useNavigate } from "react-router-dom";

export default function RTracker() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{height: "100vh"}}> 
        <div style={{width: "85%", margin: "0 auto", maxWidth: "1200px"}}>
          <Navbar />
        </div>
        <div className="hero">
          <div className="hero-text-container">
            <p className="hero-text">The ultimate way to track your races</p>
            <div className="hero-btn" onClick={() => navigate("/users/signup")}>Get started</div>
            <div style={{height: "5rem"}}></div>
          </div>
        </div>
      </div>
      <div className="section-features">
        <p className="text-features">Features</p>
        <div className="features-row">
          <div className="features-item">
            <div className="features-item-text">
              <p className="feature-heading">Extensive Data</p>
              <p className="features-description">An abundance of information available for each race such as position, gap, and fuel level</p>
            </div>
          </div>
          <div className="features-item">
            <div className="features-item-text">
              <p className="feature-heading">Generous Graphs</p>
              <p className="features-description">An abundance of information available for each race such as position, gap, and fuel level</p>
            </div>
          </div>
          <div className="features-item">
            <div className="features-item-text">
              <p className="feature-heading">Detailed Diagrams</p>
              <p className="features-description">An abundance of information available for each race such as position, gap, and fuel level</p>
            </div>
          </div>
          <div className="features-item">
            <div className="features-item-text">
              <p className="feature-heading">Alone or Together</p>
              <p className="features-description">Data is gathered and saved for both singleplayer and multiplayer races.</p>
            </div>
          </div>
          <div className="features-item">
            <div className="features-item-text">
              <p className="feature-heading">Build Your Profile</p>
              <p className="features-description">An abundance of information available for each race such as position, gap, and fuel level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}