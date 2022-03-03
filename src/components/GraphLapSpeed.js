import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

export default function GraphLapSpeed(props) {
  
  const lapLabels = lapTimeline => {
    if (lapTimeline === null) {
      return;
    }

    return (
      lapTimeline.slice(0, lapTimeline.length - 1).map((time, index) => (
        <VictoryAxis
          key={index}
          dependentAxis
          style={{axisLabel: {padding: 5, fill: "rgba(133, 133, 133, 0.2)"}, axis: { stroke: "rgba(133, 133, 133, 0.2)", strokeDasharray: "10"}, tickLabels: { fill: "none"}}}
          axisValue={time}
          label={`lap ${index + 2}`}
          standalone={false}
        />
      ))
    )
  }

  return (
    <VictoryChart height={200} padding={{left: 75, top: 50, bottom: 50, right: 50}}>
      <VictoryAxis
        style={{axisLabel: {fill: "white", padding: 30, fontSize: 8 }, axis: { stroke: "white"}, tickLabels: {fill: "white", fontSize: 8 }, ticks: {stroke: "grey", size: 5}}} label="Time (s)"
      />
      <VictoryAxis
        dependentAxis
        label="Speed (m/s)"
        domain={[0, null]}
        style={{axisLabel: {fill: "white", padding: 38, fontSize: 8}, axis: { stroke: "white"}, tickLabels: { fill: "white", fontSize: 8 }, ticks: {stroke: "grey", size: 5} } }
      />
      {lapLabels(props.lapTimeline)}
      <VictoryLine style={{data: { strokeWidth: 1, stroke: "#c43a31" }}} data={props.speed_data} x="time" y="speed" />
    </VictoryChart>
  )
}