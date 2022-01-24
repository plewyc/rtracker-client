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
      <VictoryLine style={{data: { stroke: "#c43a31" }}} data={props.position_data} x="time" y="race_position" />
    </VictoryChart>
  )
}