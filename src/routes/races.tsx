import { useState, useEffect } from "react";

export default function Races() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_URL}/races`)
    .then(res => res.json())
    .then(res => setRaces(res));
  }, []);

  return (
<table style={{color: "black"}}>
  <thead>
    <tr>
      <th style={{padding: "0 0.5rem"}}>Circuit</th>
      <th style={{padding: "0 0.5rem"}}>Vehicle</th>
      <th style={{padding: "0 0.5rem"}}>Laps</th>
      <th style={{padding: "0 0.5rem"}}>Opponents</th>
      <th style={{padding: "0 0.5rem"}}>Finish position</th>
      <th style={{padding: "0 0.5rem"}}>Average lap time</th>
    </tr>
  </thead>
  <tbody>
    { races.map(race => (
    <tr key={race.id}>
      <td style={{padding: "0 0.5rem"}}>{race.track_name}</td>
      <td style={{padding: "0 0.5rem"}}>{race.vehicle}</td>
      <td style={{padding: "0 0.5rem"}}>{race.laps}</td>
      <td style={{padding: "0 0.5rem"}}>{race.num_opponents}</td>
      <td style={{padding: "0 0.5rem"}}>{race.finish_pos || "error"}</td>
      <td style={{padding: "0 0.5rem"}}>{race.avg_lap_time}s</td>
      <td className="underline" style={{padding: "0 0.5rem"}}><a href={"/races/" + race.id}>details</a></td>
    </tr>
    ))}
  </tbody>
</table>
  );
}