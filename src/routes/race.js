import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/race.css";
import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';
import GraphGapToLeader from "../components/GraphGapToLeader";
import GraphPosistion from "../components/GraphPosition";
import Navbar from "../components/navbar";
import GraphLapSpeed from "../components/GraphLapSpeed";

export default function Races() {
  const [race, setRace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  const apiHost = () => {
    const host = "https://api.rtracker.app/";
    return host;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this race?")) {
      fetch(`${apiHost()}/races/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('rtracker-jwt-token')}`
        }
      })
      .then(() => navigate("/races"))
    }
  }

  const toggleDetails = (driverId) => {
    let driverDetails = document.getElementById("driver-" + driverId);
    if (driverDetails.style.display === "none") {
      driverDetails.style.display = "block";
    } else {
      driverDetails.style.display = "none";
    }
  }

  const showUpdateForm = () => {
    let form = document.getElementById("ai-update-form");
    if (form.style.display === "none") {
      document.getElementById("ai-attributes").style.display = "none";
      document.getElementById("ai-update-form").style.display = "block";
    } else {
      document.getElementById("ai-attributes").style.display = "block";
      document.getElementById("ai-update-form").style.display = "none";
    }
  }

  const updateAiAttributes = () => {
    const ai_skill = document.getElementById("ai-skill-field").value;
    const ai_aggression = document.getElementById("ai-aggression-field").value;
    const ai_limiter = document.getElementById("ai-limiter-field").value;

    fetch(`${apiHost()}/races/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        race: {
          opponent_skill: ai_skill,
          opponent_aggression: ai_aggression,
          ai_limiter: ai_limiter
        }
      })
    })
    .then(() => window.location.reload());
  }

  useEffect(() => {
    fetch(`${apiHost()}/races/${id}`)
    .then(res => res.json())
    .then(res => {
      setRace(res);
      console.log(res);
      setIsLoading(false);
    });
  }, [id]);

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
              <div style={styles.trackName}>{race.track_name}</div>
              <div style={styles.vehicleName}>{race.drivers[0].vehicle}</div>
            </div>
            <div style={styles.finishDate}>{race.finish_date}</div>
          </div>
          <div style={{paddingTop: "1rem", marginBottom: "2rem"}}>
            <div className="qualifying-btn" onClick={() => navigate("/races/" + id + "/qualifying")}>Qualifying</div>
          </div>
          <div className="race-info">
            <h2 className="race-stat">Your average lap time: {Number(race.drivers[0].avg_race_lap_time).toFixed(3)}s</h2>
            <h2 className="race-stat">Average lap time for other drivers: {Number(race.avg_race_lap_time_all).toFixed(3)}s</h2>
            <h2 className="race-stat">Opponents: {race.num_opponents}</h2>
            {/* <div id="ai-attributes" style={{marginBottom: "1rem"}}>
              <h2 id="ai-skill" className="race-stat">AI skill: {race.opponent_skill !== null ? race.opponent_skill : <span>NOT SET</span>}</h2>
              <h2 id="ai-aggression" className="race-stat">AI aggression: {race.opponent_aggression !== null ? race.opponent_aggression : "NOT SET"}</h2>
              <h2 id="ai-limiter" className="race-stat">AI limiter: {false ? race.ai_limiter : "NOT SET"}</h2>
              <div className="update-ai-btn" onClick={() => showUpdateForm()}>Update AI</div>
            </div> */}
            <div id="ai-update-form">
              <div className="ai-form-field">
                <div>AI skill</div>
                <input type="number" id="ai-skill-field" min="0" max="120" step="1" />
              </div>
              <div className="ai-form-field">
                <div>AI aggression</div>
                <input type="number" id="ai-aggression-field" min="0" max="100" step="1" />
              </div>
              <div className="ai-form-field">
                <div>AI limiter</div>
                <input type="number" id="ai-limiter-field" min="0" max="100" step="1" />
              </div>
              <div id="ai-update-submit" onClick={() => updateAiAttributes()}>Update</div>
            </div>
          </div>
          {/* {console.log(race.drivers[0].timed_statistics)} */}
          <div className="driver-summary-header">
            <p>Position</p>
            <p>Driver</p>
            <p>Vehicle</p>
            <p>Gap</p>
            <p>Best Lap</p>
          </div>
          {race.drivers.sort((a, b) => a.race_pos > b.race_pos ? 1 : -1).map((driver, i) => (
            <div key={"driver-" + driver.id}>
              <div className="driver-summary" onClick={() => toggleDetails(driver.id)}>
                <p>{driver.race_pos}</p>
                <div>{driver.name}</div>
                <div>{driver.vehicle}</div>
                <div>{i !== 0 ? "+" + Number(driver.scoring_details[driver.scoring_details.length - 1].gap_to_leader).toFixed(3) + "s" : null}</div>
                <div>{Number(driver.fastest_race_lap.lap_time).toFixed(3)}s</div>
              </div>
              <div id={"driver-" + driver.id} style={styles.driverDetails}>
              {/* {driver.laps.map(lap => (
                <p key={lap.id}>({lap.session_type}) lap {lap.lap_number}: {lap.lap_time}s</p>
              ))} */}
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", padding: "1rem"}}>
          <GraphGapToLeader timed_statistics={driver.scoring_details} lapTimeline={driver.lap_timeline} />
          <GraphPosistion position_data={driver.scoring_details} num_opponents={race.num_opponents} lapTimeline={driver.lap_timeline} />
          { driver.is_player &&
            <div>
              <GraphLapSpeed speed_data={driver.telemetry_details} lapTimeline={driver.lap_timeline} />
            </div>
          }
            </div>
              <div className={"driver-stats-alt"}>
                <div>Lap #</div>
                <div>Lap time</div>
                <div>Sector 1</div>
                <div>Sector 2</div>
                <div>Sector 3</div>
              </div>
              {driver.laps.race.map((lap, i) => (
                <div className={i % 2 !== 0 ? "driver-stats-alt" : "driver-stats"}>
                  <div>{"lap " + lap.lap_number}</div>
                  <div>{Number(lap.lap_time).toFixed(3) + "s"}</div>
                  <div>{Number(lap.sector_1).toFixed(3) + "s"}</div>
                  <div>{Number(lap.sector_2).toFixed(3) + "s"}</div>
                  <div>{Number(lap.sector_3).toFixed(3) + "s"}</div>
                </div>
                // session.laps.map(lap => {
                // })
              ))}
              </div>
            </div>
          ))}
          <div style={{paddingTop: "1rem"}}>
            <div style={styles.deleteBtn} onClick={handleDelete}>Delete</div>
          </div>
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
    borderRadius: "0.3rem",
    background: "rgb(53, 53, 75)"
  }
}