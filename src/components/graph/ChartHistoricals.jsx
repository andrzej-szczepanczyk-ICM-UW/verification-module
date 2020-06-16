import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import taucharts from "taucharts";
//import { render } from "@testing-library/react";

// let MyTauChart = React.createClass({
//   displayName: 'MyTauChart',
//   componentWillUnmount(){
//     this._chart.destroy();
//   },
//   componentDidMount(){
//     this._chart = new taucharts.Chart(Object.assign({}, this.props))
//     this._chart.renderTo(this.refs.placeholder);
//   },
// })

// let ReactIgnore = React.createClass({
//   displayName: 'ReactIgnore',
//   shouldComponentUpdate: () => {return false},
//   render(){
//     return React.Children.only(this.props.children)
//   }
// })

export function ChartHistoricals(props) {
  const { historical_data } = useSelector((state) => state.table);

  const hist_config = {
    type: "scatterplot",
    x: "value_um",
    y: "value_imgw",
    data: [
      { value_um: 1, value_imgw: 1 },
      { value_um: 2, value_imgw: 2 },
    ], //historical_data,
  };
  const ref = useRef(null);
  useEffect(() => {
    const chart = new taucharts.Chart(hist_config);
    chart.renderTo(ref.current);
    return () => {
      chart.destroy();
    };
  });

  function check() {
    console.warn("ChartHistoricals", historical_data);
  }

  return (
    <>
      <div>Chart Historicals</div>
      <div ref={ref} />
      <button onClick={check}>Check availability of data</button>
    </>
  );
}
