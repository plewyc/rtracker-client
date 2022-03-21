import "./ResultsTable.css";
import GraphGapToLeader from "../GraphGapToLeader";
import GraphPosition from "../GraphPosition";

export default function ResultsRow({ driver, numOpponents }) {

  const toggleDetails = (driverId) => {
    let driverDetails = document.getElementById("driver-" + driverId);
    console.log(driverDetails.style.display);
    if (driverDetails.style.display !== "block") {
      driverDetails.style.display = "block";
    } else {
      driverDetails.style.display = "none";
    }
  }

  return (
    <>
      <div className="table-row" onClick={() => {toggleDetails(driver.id)}}>
        <p>{driver.race_pos}</p>
        <div>{driver.name}</div>
        <div>{driver.vehicle}</div>
        <div>{Number(driver.gap_to_leader).toFixed(2)}s</div>
        <div>{driver.fastest_race_lap !== null ? Number(driver.fastest_race_lap.lap_time).toFixed(3) : 0}s</div>
      </div>
      <div id={`driver-${driver.id}`} className="driver-details">
        <div className="graphs">
          <GraphGapToLeader timed_statistics={driver.scoring_details} lapTimeline={driver.lap_timeline} />
          <GraphPosition position_data={driver.scoring_details} num_opponents={numOpponents} lapTimeline={driver.lap_timeline} />
        </div>
          <div className={"driver-stats-alt"}>
          <div>Lap #</div>
          <div>Lap time</div>
          <div>Sector 1</div>
          <div>Sector 2</div>
          <div>Sector 3</div>
        </div>
        {driver.laps.race.map((lap, i) => (
          <div key={i} className={i % 2 !== 0 ? "driver-stats-alt" : "driver-stats"}>
            <div>{"lap " + lap.lap_number}</div>
            <div>{Number(lap.lap_time).toFixed(3) + "s"}</div>
            <div>{Number(lap.sector_1).toFixed(3) + "s"}</div>
            <div>{Number(lap.sector_2).toFixed(3) + "s"}</div>
            <div>{Number(lap.sector_3).toFixed(3) + "s"}</div>
          </div>
        ))}
      </div>
    </>
  )
}