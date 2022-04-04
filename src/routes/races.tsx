import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function Races() {
  const [races, setRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_URL}/races`)
    .then(res => res.json())
    .then(res => {
      setRaces(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
    { isLoading && 
      <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress />
      </div>
    }
    {
      !isLoading &&
      <table cellSpacing="0" cellPadding="0" style={{color: "black", margin: "0 auto"}}>
        <thead style={{backgroundColor: "#98A5FF", color: "white", borderSpacing: 0}}>
          <tr>
            <th style={{padding: "0.5rem"}}>Circuit</th>
            <th style={{padding: "0.5rem"}}>Vehicle</th>
            <th style={{padding: "0.5rem"}}>Laps</th>
            <th style={{padding: "0.5rem"}}>Opponents</th>
            <th style={{padding: "0.5rem"}}>Finish position</th>
            <th style={{padding: "0.5rem"}}>Average lap time</th>
            <th style={{padding: "0.5rem"}}></th>
          </tr>
        </thead>
        <tbody style={{backgroundColor: "#D1D7FF"}}>
          { races.map(race => (
          <tr key={race.id}>
            <td style={{padding: "0.5rem"}}>{race.track_name}</td>
            <td style={{padding: "0.5rem"}}>{race.vehicle}</td>
            <td style={{padding: "0.5rem"}}>{race.laps}</td>
            <td style={{padding: "0.5rem"}}>{race.num_opponents}</td>
            <td style={{padding: "0.5rem"}}>{race.finish_pos || "error"}</td>
            <td style={{padding: "0.5rem"}}>{race.avg_lap_time}s</td>
            <td className="underline" style={{padding: "0.5rem"}}><a href={"/races/" + race.id}>details</a></td>
          </tr>
          ))}
        </tbody>
      </table>
    }
    </>
  );
}