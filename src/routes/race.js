import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/race.css";
import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';

export default function Races() {
  const [race, setRace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this race?")) {
      fetch('https://rf2tracker.herokuapp.com/races/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
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

  useEffect(() => {
    fetch('http://rf2tracker/races/' + id)
    .then(res => res.json())
    .then(res => {
      setRace(res);
      setIsLoading(false);
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
          <div className="race-info">
            <h2 className="race-stat">Your average lap time: {race.drivers[0].avg_race_lap_time}s</h2>
            <h2 className="race-stat">Average lap time for other drivers: {race.avg_race_lap_time_all}s</h2>
            <h2 className="race-stat">Opponents: {race.num_opponents}</h2>
          </div>
          {console.log(race.drivers[0].timed_statistics)}
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
                <div>{i !== 0 ? "+" + Number(driver.timed_statistics[driver.timed_statistics.length - 1].gap_to_leader).toFixed(3) + "s" : null}</div>
                <div>{Number(driver.fastest_race_lap.lap_time).toFixed(3)}s</div>
              </div>
              <div id={"driver-" + driver.id} style={styles.driverDetails}>
              {/* {driver.laps.map(lap => (
                <p key={lap.id}>({lap.session_type}) lap {lap.lap_number}: {lap.lap_time}s</p>
              ))} */}
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", padding: "1rem"}}>
          <VictoryChart>
          <VictoryAxis
          label="Time (s)"
          style={{axisLabel: {padding: 30, fill: "white"}, axis: { stroke: "white"}, tickLabels: { fill: "white"}}}
        />
         <VictoryAxis
         dependentAxis
         label="Gap to leader"
         minDomain="0"
          style={{axisLabel: {padding: 38, fill: "white"}, axis: { stroke: "white"}, tickLabels: { fill: "white"}}}
        />
            <VictoryLine interpolation="natural" style={{data: { stroke: "#c43a31" }}} data={driver.timed_statistics} x="time" y="gap_to_leader" />
          </VictoryChart>

          <VictoryChart>
          <VictoryAxis
          style={{axisLabel: {fill: "white", padding: 30}, axis: { stroke: "white"}, tickLabels: {fill: "white"}, ticks: {stroke: "grey", size: 5}}} label="Time (s)"
        />
         <VictoryAxis
         dependentAxis
         invertAxis
         label="Position"
         domain={[1, race.num_opponents + 1]}
         tickValues={[...Array(race.num_opponents + 1).keys()].map(i => i % 2 === 0 ? i + 1 : null)}
          style={{axisLabel: {fill: "white", padding: 38}, axis: { stroke: "white"}, tickLabels: { fill: "white" }, ticks: {stroke: "grey", size: 5} } }
        />
            <VictoryLine style={{data: { stroke: "#c43a31" }}} data={driver.timed_statistics} x="time" y="race_position" />
          </VictoryChart>
            </div>
              {driver.laps.race.map((lap, i) => (
                <div className={i % 2 !== 0 ? "driver-stats" : "driver-stats-alt"}>
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