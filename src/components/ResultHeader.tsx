import "../styles/components/ResultsHeader.css";

export default function ResultsHeader({ race }) {
  const numOpponents = () => {
    if (race.drivers.length === 1) {
      return "No opponents"
    } else if (race.drivers.length === 2) {
      return "1 opponent";
    } else {
      return `${race.drivers.length - 1} opponents`;
    }
  }

  const additionalLaps = aLaps => {
    if (aLaps === 0) {
      return '';
    } else if (aLaps === 1) {
      return `(+${race.race_additional_laps} lap)`;
    } else {
      return `(+${race.race_additional_laps} laps)`;
    }
  }

  return (
    <div className="header">
      <div className="flex-between">
        <h1 className="track">{race.track}</h1>
        <p>{race.finish_date}</p>
      </div>
      <p className="vehicle">{race.drivers[0].vehicle}</p>
      <div className="">
        { race.race_type === "laps" ?
          <p className="quick-details">{race.drivers[0].race_pos}   |   {race.race_laps}   |   {numOpponents()}</p>
        :
          <p className="quick-details">{race.drivers[0].race_pos}   |   {race.race_duration}{additionalLaps(race.race_additional_laps)}   |   {numOpponents()}</p>
        }
      </div>
    </div>
  )
}