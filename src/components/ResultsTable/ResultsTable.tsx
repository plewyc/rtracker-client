import "./ResultsTable.css";
import ResultsRow from "./ResultsRow.tsx";

export default function ResultsTable({ drivers }) {
  return (
    <div>
      <div className="table-header">
        <p>Position</p>
        <p>Driver</p>
        <p>Vehicle</p>
        <p>Gap</p>
        <p>Best Lap</p>
      </div>
      {drivers && drivers.map(driver => <ResultsRow key={driver.id} driver={driver} numOpponents={drivers.length} />)}
    </div>
  )
}
