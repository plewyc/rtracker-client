import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

const GraphLapTimes = ({ laps }) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      height={225}
    >
      <VictoryAxis
        style={{axisLabel: {fill: "black", padding: 30}, axis: { stroke: "black"}, tickLabels: {fill: "black"}, ticks: {stroke: "grey", size: 5}}} label="Lap Number" domain={[0, laps.race.length + 1]}
      />
      <VictoryAxis
        dependentAxis
        label="Time (s)"
        style={{axisLabel: {fill: "black", padding: 38}, axis: { stroke: "black"}, tickLabels: { fill: "black" }, ticks: {stroke: "grey", size: 5} } }
      />
      <VictoryBar data={laps.race} x="lap_number" y="lap_time" labels={({datum}) => Number(datum.lap_time).toFixed(3)} />
    </VictoryChart>
  )
}

export default GraphLapTimes;