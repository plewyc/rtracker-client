import * as V from 'victory';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';

export default function GraphGapToLeader(props) {
  return (
    <VictoryChart>
      <VictoryAxis
        label="Time (s)"
        style={{axisLabel: {padding: 30, fill: "white"}, ticks: {stroke: "grey", size: 5}, axis: { stroke: "white"}, tickLabels: { fill: "white"}}}
      />
      <VictoryAxis
        dependentAxis
        label="Gap to leader (s)"
        minDomain={0}
        style={{axisLabel: {padding: 38, fill: "white"}, axis: { stroke: "white"}, tickLabels: { fill: "white"}, ticks: {stroke: "grey", size: 5}}}
      />
      <VictoryAxis
        dependentAxis
        style={{axisLabel: {padding: 5, fill: "gray"}, axis: { stroke: "gray"}, tickLabels: { fill: "none"}}}
        axisValue={300}
        label="Lap 1"
        standalone={false}
      />
      <VictoryLine interpolation="natural" style={{data: { stroke: "#c43a31" }}} data={props.timed_statistics} x="time" y="gap_to_leader" />
    </VictoryChart>
  )
}