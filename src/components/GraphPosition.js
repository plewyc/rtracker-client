import React from 'react';
import PropTypes from "prop-types";
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
          label={`lap ${index + 2}`}
          standalone={false}
        />
      ))
    )
  }

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
      {lapLabels(props.lapTimeline)}
      <VictoryLine style={{data: { stroke: "#c43a31" }}} data={props.position_data} x="time" y="position" />
    </VictoryChart>
  )
}

GraphPosition.propTypes = {
  position_data: PropTypes.array,
  num_opponents: PropTypes.number,
  lapTimeline: PropTypes.array
};