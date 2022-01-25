import * as V from 'victory';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';

export default function GraphPosistion(props) {
  return (
    <VictoryChart>
      <VictoryAxis
        style={{axisLabel: {fill: "white", padding: 30}, axis: { stroke: "white"}, tickLabels: {fill: "white"}, ticks: {stroke: "grey", size: 5}}} label="Time (s)"
      />
      <VictoryAxis
        dependentAxis
        invertAxis
        label="Position"
        domain={[1, props.num_opponents + 1]}
        tickValues={[...Array(props.num_opponents + 1).keys()].map(i => i % 2 === 0 ? i + 1 : null)}
        style={{axisLabel: {fill: "white", padding: 38}, axis: { stroke: "white"}, tickLabels: { fill: "white" }, ticks: {stroke: "grey", size: 5} } }
      />
      {props.lapTimeline.slice(0, props.lapTimeline.length - 1).map((time, index) => (
        <VictoryAxis
          key={index}
          dependentAxis
          style={{axisLabel: {padding: 5, fill: "rgba(133, 133, 133, 0.2)"}, axis: { stroke: "rgba(133, 133, 133, 0.2)", strokeDasharray: "10"}, tickLabels: { fill: "none"}}}
          axisValue={time}
          label={`lap ${index + 2}`}
          standalone={false}
        />
      ))}
      <VictoryLine style={{data: { stroke: "#c43a31" }}} data={props.position_data} x="time" y="race_position" />
    </VictoryChart>
  )
}