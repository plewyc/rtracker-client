import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import "../styles/users/user.css";

export default function User() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [statusCode, setStatusCode] = useState();
  const navigate = useNavigate();

  const { id } = useParams()

  const apiHost = () => {
    const host = "https://rf2tracker.herokuapp.com";
    return host;
  }

  useEffect(() => {
    const token = localStorage.getItem('rtracker-jwt-token');

    fetch(`${apiHost()}/users/${id}`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    })
    .then(res => {
      setStatusCode(res.status);
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(res => {
      if (res !== null) {
        setUser(res.user);
      }
      setIsLoading(false);
    });
  }, [id]);

  const loading = () => {
    return (
      <div>
        <Navbar />
        Loading.. please wait!
      </div>
    );
  }

  const profile = () => {
    return (
      <div>
        <Navbar />
        <div className="user-container">
          <h1>{user.username}</h1>
          <div>
            <h2>Favorite tracks</h2>
            {user.favorite_tracks.map((track, index) => <p>{index + 1} - {track[0]}</p>)}
          </div>
          <div>
            <h2>Favorite vehicles</h2>
            {user.favorite_vehicles.map((vehicle, index) => <p>{index + 1} - {vehicle[0]}</p>)}
          </div>
        </div>
      </div>
    )
  }

  const unauthorized = () => {
    return (
      <div>
        <Navbar />
        <h1 style={{color: "white", textAlign: "center"}}>This user has a private profile</h1>
      </div>
    );
  }

  if (isLoading) {
    return loading();
  } else if (statusCode !== 200) {
    return unauthorized();
  } else {
    return profile();
  }
}