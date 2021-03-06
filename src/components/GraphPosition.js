import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

export default function GraphPosition(props) {

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
          label={`lap ${index + 1}`}
          standalone={false}
        />
      ))
    )
  }

  return (
    <VictoryChart height={300}>
      <VictoryAxis
        style={{axisLabel: {fill: "black", padding: 30}, axis: { stroke: "black"}, tickLabels: {fill: "black"}, ticks: {stroke: "grey", size: 5}}} label="Time (s)"
      />
      <VictoryAxis
        dependentAxis
        invertAxis
        label="Position"
        domain={[1, props.num_opponents + 1]}
        tickValues={[...Array(props.num_opponents + 1).keys()].map(i => i % 2 === 0 ? i + 1 : null)}
        style={{axisLabel: {fill: "black", padding: 38}, axis: { stroke: "black"}, tickLabels: { fill: "black" }, ticks: {stroke: "grey", size: 5} } }
      />
      {lapLabels(props.lapTimeline)}
      <VictoryLine style={{data: { stroke: "#c43a31" }}} data={props.position_data} x="time" y="position" />
    </VictoryChart>
  )
}