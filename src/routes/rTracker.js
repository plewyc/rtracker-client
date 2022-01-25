import Navbar from "../components/navbar";
import "../styles/rTracker.css";

export default function RTracker() {
  return (
    <div className="img-back">
      <div className="home-container">
        <Navbar />
        <div className="hero-text-container">
          <p className="hero-main">The best way to look<br/>back at your races</p>
          <p className="hero-sub">Easily track your races, stats, and progress</p>
          <div className="btn-action">Get started</div>
        </div>
      </div>
      {/* <img className="background-img" src="background2.jpeg" /> */}
      <h1 style={{color: "white"}}>Track your races</h1>
    </div>
  )
}