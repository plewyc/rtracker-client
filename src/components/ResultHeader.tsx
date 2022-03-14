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

  const player = drivers => {
    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i].is_player) {
        return drivers[i];
      }
    }
  }

  const raceLaps = laps => {
    return laps === 1 ? `${laps} lap` : `${laps} laps`;
  }

  return (
    <div className="header">
      <div className="flex-between">
        <h1 className="track">{race.track_name}</h1>
        <p>{race.finish_date}</p>
      </div>
      <p className="vehicle">{race.drivers[0].vehicle}</p>
      <div className="">
        { race.race_type === "laps" ?
          <p className="quick-details">{player(race.drivers).race_pos_ordinalized}   |   {raceLaps(race.race_laps)}   |   {numOpponents()}</p>
        :
          <p className="quick-details">{player(race.drivers).race_pos_ordinalized}   |   {race.race_duration} minutes {additionalLaps(race.race_additional_laps)}   |   {numOpponents()}</p>
        }
      </div>
    </div>
  )
}