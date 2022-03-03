import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

export default function GraphGapToLeader(props) {

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
      {lapLabels(props.lapTimeline)}
      <VictoryLine interpolation="natural" style={{data: { stroke: "#c43a31" }}} data={props.timed_statistics} x="time" y="gap_to_leader" />
    </VictoryChart>
  )
}