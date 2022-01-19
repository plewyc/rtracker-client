import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/race.css";

export default function Races() {
  const [race, setRace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  const handleDelete = () => {
    fetch('https://rf2tracker.herokuapp.com/races/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => navigate("/races"))
  }

  const toggleDetails = (driverId) => {
    let driverDetails = document.getElementById("driver-" + driverId);
    if (driverDetails.style.display === "none") {
      driverDetails.style.display = "block";
    } else {
      driverDetails.style.display = "none";
    }
  }

  useEffect(() => {
    fetch('https://rf2tracker.herokuapp.com/races/' + id)
    .then(res => res.json())
    .then(res => {
      setRace(res);
      setIsLoading(false);
      console.log(res);
    });
  }, [id]);

  return (
    <div className="container">
      { isLoading &&
      <div>Loading.. please wait!</div>
      }
      { !isLoading &&
        <div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
              <div style={styles.trackName}>{race.track_name}</div>
              <div style={styles.vehicleName}>{race.drivers[0].vehicle}</div>
            </div>
            <div style={styles.finishDate}>{race.finish_date}</div>
          </div>
          <div style={{paddingTop: "1rem", marginBottom: "2rem"}}>
            <div className="qualifying-btn" onClick={() => navigate("/races/" + id + "/qualifying")}>Qualifying</div>
          </div>
          <h2 className="race-stat">Your average lap time: {race.drivers[0].avg_race_lap_time}s</h2>
          <h2 className="race-stat">Average lap time for other drivers: {race.avg_race_lap_time_all}s</h2>
          <h2 className="race-stat">Opponents: {race.num_opponents}</h2>
          <div className="driver-summary-header">
            <p>Position</p>
            <p>Driver</p>
            <p>Vehicle</p>
            <p>Gap</p>
            <p>Best Lap</p>
          </div>
          {race.drivers.map((driver, i) => (
            <div key={"driver-" + driver.id}>
              <div className="driver-summary" onClick={() => toggleDetails(driver.id)}>
                <p>{i + 1}</p>
                <div>{driver.name}</div>
                <div>{driver.vehicle}</div>
                <div>+0.042</div>
                <div>{Number(driver.fastest_race_lap.lap_time).toFixed(3)}s</div>
              </div>
              <div id={"driver-" + driver.id} style={styles.driverDetails}>
              {/* {driver.laps.map(lap => (
                <p key={lap.id}>({lap.session_type}) lap {lap.lap_number}: {lap.lap_time}s</p>
              ))} */}
              {driver.laps.race.map(lap => (
                // session.laps.map(lap => {
                  <p key={lap.id}>lap {lap.lap_number}: {lap.lap_time}s</p>
                // })
              ))}
              </div>
            </div>
          ))}
          <div style={{paddingTop: "1rem"}}>
            <div style={styles.deleteBtn} onClick={handleDelete}>Delete</div>
          </div>
        </div>
      }
    </div>
  );
}

const styles = {
  container: {
    margin: "2% 10%",
  },
  trackName: {
    fontWeight: "bold",
    fontSize: "3em",
    marginBottom: "0"
  },
  vehicleName: {
    fontWeight: "500",
  },
  finishDate: {
    textAlign: "right",
    color: "gray",
    fontWeight: "thin",
    fontSize: "1em"
  },
  deleteBtn: {
    padding: "0.3rem 0.6rem",
    background: "red",
    color: "white",
    display: "inline",
    borderRadius: "0.3rem"
  },
  driverSummary: {
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: "0.3rem",
    marginBottom: "0.5rem",
    padding: "0.3rem 0.7rem",
  },
  driverDetails: {
    display: "none",
    marginBottom: "0.5rem",
    padding: "0.3rem 0.7rem",
    borderRadius: "0.3rem",
    border: "1px solid black"
  }
}