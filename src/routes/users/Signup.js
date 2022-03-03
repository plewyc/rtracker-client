import "../../styles/users/login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

export default function Signup() {
  const navigate = useNavigate();

  const apiHost = () => {
    const host = "https://rf2tracker.herokuapp.com";
    return host;
  }

  const handleLogin = () => {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const passwordConfirmation = document.getElementById("signup-password-confirmation").value;

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
    .then(res => {
      localStorage.setItem('rtracker-jwt-token', res.token);
      navigate(`/users/${res.user_id}`);
    });
  }

  return (
    <>
    <div className="img-background">
      <div className="container-auth">
      <Navbar />
      <div style={{height: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="login-container">
          <div style={{marginTop: "0.5rem"}}>
            <h1 className="form-title">Sign up</h1>
            <p className="sign-up-text">Already have an account? <a href="/users/login">Sign in</a></p>
            <div className="form-container">
              <input id="signup-username" className="form-text" type="text" placeholder="Username" />
              <input id="signup-password" className="form-text" type="password" placeholder="Password" />
              <input id="signup-password-confirmation" className="form-text" type="password" placeholder="Confirm password" />
              <div className="form-submit" onClick={() => handleLogin()}>Sign up</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}