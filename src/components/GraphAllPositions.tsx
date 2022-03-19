import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

export default function GraphAllPositions(props) {

  const getDriverPositions = (driver) => {
    return <VictoryLine style={{data: { strokeWidth: 1, stroke: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') }}} data={driver.scoring_details} x="time" y="position" />;
  }

  return (
    <VictoryChart>
      <VictoryAxis
        style={{axisLabel: {fill: "black", padding: 30}, axis: { stroke: "black"}, tickLabels: {fill: "black"}, ticks: {stroke: "grey", size: 5}}} label="Time (s)"
      />
      <VictoryAxis
        dependentAxis
        invertAxis
        label="Position"
        // domain={[1, props.num_opponents + 1]}
        // tickValues={[...Array(props.num_opponents + 1).keys()].map(i => i % 2 === 0 ? i + 1 : null)}
        style={{axisLabel: {fill: "black", padding: 38}, axis: { stroke: "black"}, tickLabels: { fill: "black" }, ticks: {stroke: "grey", size: 5} } }
      />
      {[...Array(props.drivers.length)].map((e, i) => getDriverPositions(props.drivers[i]))}
      {/* {console.log(props.drivers[0].scoring_details)} */}
      {/* <VictoryLine style={{data: { stroke: "#c43a31" }}} data={props.drivers[0].scoring_details} x="time" y="position" /> */}
    </VictoryChart>
  )
}