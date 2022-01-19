import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function User() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    fetch('https://rf2tracker.herokuapp.com/users/' + id)
    .then(res => res.json())
    .then(res => {
      setUser(res);
      setIsLoading(false);
      console.log(res);
    });
  }, [id]);


  return (
    <div>
      { isLoading &&
      <div>Loading.. please wait!</div>
      }
      { !isLoading &&
      <div>
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
      }
    </div>
  )
}