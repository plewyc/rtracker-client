import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function ResultsQualifying() {
  const [race, setRace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    fetch('https://rf2tracker.herokuapp.com/races/' + id + '/qualifying')
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
    <div style={styles.container}>
      { isLoading &&
      <div>Loading.. please wait!</div>
      }
      { !isLoading &&
        <div>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem"}}>
            <div>
              <div style={styles.trackName}>{race.track_name}</div>
              <div style={styles.vehicleName}>{race.drivers[0].vehicle}</div>
            </div>
            <div style={styles.finishDate}>{race.finish_date}</div>
          </div>
          <h2>Your average lap time: {Number(race.drivers[0].avg_race_lap_time).toFixed(3)}s</h2>
          <h2>Average lap time for other drivers: {Number(race.avg_race_lap_time_all).toFixed(3)}s</h2>
          <h2>Opponents: {race.num_opponents}</h2>
          {/* <hr style={{marginTop: "2rem"}}/> */}
          <div style={styles.driverSummaryHeader}>
            <p>Position</p>
            <p>Driver details</p>
            <p>Gap</p>
            <p>Lap</p>
            <p>Sector 1</p>
            <p>Sector 2</p>
            <p>Sector 3</p>
          </div>
          {race.drivers.map((driver, i) => (
            <div>
            <div key={"driver-" + driver.id}>
              <div style={styles.driverSummary} onClick={() => toggleDetails(driver.id)}>
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
            <div id={"driver-" + driver.id} style={styles.driverDetails}>
              {/* {driver.laps.map(lap => (
                <p key={lap.id}>({lap.session_type}) lap {lap.lap_number}: {lap.lap_time}s</p>
              ))} */}
              {driver.laps.qualifying.map((lap, index) => (
                <div style={styles.qualifyingDetails}>
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
  driverSummaryHeader: {
    border: "1px solid black",
    borderRadius: "0.3rem",
    marginBottom: "0.5rem",
    padding: "0.3rem 0.7rem",
    display: "grid",
    gridTemplateColumns: "5rem 2fr 1fr 1fr 1fr 1fr 1fr",
    alignItems: "center"
  },
  driverSummary: {
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: "0.3rem",
    marginBottom: "0.5rem",
    padding: "0.3rem 0.7rem",
    display: "grid",
    // gridTemplateColumns: "5rem 1fr 10rem 10rem 10rem 10rem 10rem",
    gridTemplateColumns: "5rem 2fr 1fr 1fr 1fr 1fr 1fr",
    alignItems: "center"
  },
  qualifyingDetails: {
    display: "grid",
    gridTemplateColumns: "5rem 2fr 1fr 1fr 1fr 1fr 1fr",
    alignItems: "center",
    margin: "0.5rem 0"
  },
  // driverSummary: {
  //   border: "1px solid black",
  //   borderRadius: "0.3rem",
  //   marginBottom: "0.5rem",
  //   padding: "0.3rem 0.7rem",
  // },
  driverDetails: {
    display: "none",
    marginBottom: "0.5rem",
    padding: "0.3rem 0.7rem",
    borderRadius: "0.3rem",
    border: "1px solid black"
  },
  position: {
    border: "1px solid black",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    textAlign: "center"
  }
}