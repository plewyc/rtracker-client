import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import '../styles/qualifying.css';

export default function ResultsQualifying() {
  const [race, setRace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    fetch('https://rf2tracker.herokuapp.com/' + id + '/qualifying')
    .then(res => res.json())
    .then(res => {
      setRace(res);
      setIsLoading(false);
      console.log(res);
    });
  }, [id]);

  const toggleDetails = (driverId) => {
    let driverDetails = document.getElementById("driver-" + driverId);
    if (driverDetails.style.display === "none") {
      driverDetails.style.display = "block";
    } else {
      driverDetails.style.display = "none";
    }
  }

  return (
    <div>
      { isLoading &&
      <div>Loading.. please wait!</div>
      }
      { !isLoading &&
        <div style={{background: "#1d1f26"}}>
          <Navbar />
          <div className="container">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div>
              <div className="track-name">{race.track_name}</div>
              <div className="vehicle-name">{race.drivers[0].vehicle}</div>
            </div>
            <div className="finish-date">{race.finish_date}</div>
          </div>
          <div style={{paddingTop: "1rem", marginBottom: "2rem"}}>
            <div className="race-btn" onClick={() => navigate("/races/" + id)}>Overview</div>
          </div>
          {/* <h2 className="race-stat">Your average lap time: {Number(race.drivers[0].avg_race_lap_time).toFixed(3)}s</h2>
          <h2 className="race-stat">Average lap time for other drivers: {Number(race.avg_race_lap_time_all).toFixed(3)}s</h2>
          <h2 className="race-stat">Opponents: {race.num_opponents}</h2> */}
          {/* <hr style={{marginTop: "2rem"}}/> */}
          <div className="driver-summary-header">
            <p>Position</p>
            <p>Driver details</p>
            <p>Gap</p>
            <p>Lap</p>
            <p>Sector 1</p>
            <p>Sector 2</p>
            <p>Sector 3</p>
          </div>
          {race.drivers.map((driver, i) => (
            <div key={"driver-" + driver.id}>
            <div>
              <div className="driver-summary" onClick={() => toggleDetails(driver.id)}>
                <p>{i + 1}</p>
                <div>
                  <div>{driver.name}</div>
                  <div>{driver.vehicle}</div>
                </div>
                {i === 0 || driver.fastest_qualifying_lap === null ? <p></p> : <p>+{(driver.fastest_qualifying_lap.lap_time - race.drivers[0].fastest_qualifying_lap.lap_time).toFixed(3)}s</p>}
                <p>{driver.fastest_qualifying_lap !== null ? Number(driver.fastest_qualifying_lap.lap_time).toFixed(3) + "s" : null}</p>
                {driver.fastest_qualifying_lap === null ? <p></p> : <p>{Number(driver.fastest_qualifying_lap.sector_1).toFixed(3)}s</p>}
                {driver.fastest_qualifying_lap === null ? <p></p> : <p>{Number(driver.fastest_qualifying_lap.sector_2).toFixed(3)}s</p>}
                {driver.fastest_qualifying_lap === null ? <p></p> : <p>{Number(driver.fastest_qualifying_lap.sector_3).toFixed(3)}s</p>}
              </div>
            </div>
            <div id={"driver-" + driver.id} className="driver-details">
              {/* {driver.laps.map(lap => (
                <p key={lap.id}>({lap.session_type}) lap {lap.lap_number}: {lap.lap_time}s</p>
              ))} */}
              {driver.laps.qualifying.map((lap, index) => (
                <div key={index} className={index % 2 === 0 ? "qualifying-details" : "qualifying-details-alt"}>
                  <p>lap {lap.lap_number}</p>
                  <p></p>
                  {lap.lap_time === driver.fastest_qualifying_lap.lap_time ? <p></p> :  <p>+{Number(lap.lap_time - driver.fastest_qualifying_lap.lap_time).toFixed(3)}s</p>}
                  <p>{lap !== null ? Number(lap.lap_time).toFixed(3) + "s" : null}</p>
                  {lap === null ? <p></p> : <p>{Number(lap.sector_1).toFixed(3)}s</p>}
                  {lap === null ? <p></p> : <p>{Number(lap.sector_2).toFixed(3)}s</p>}
                  {lap === null ? <p></p> : <p>{Number(lap.sector_3).toFixed(3)}s</p>}
                </div>
              ))}
            </div>
            </div>
          ))}
        </div>
        </div>
      }
    </div>
  );
}