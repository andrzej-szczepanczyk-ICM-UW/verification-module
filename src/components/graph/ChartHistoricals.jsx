import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import taucharts from "taucharts";

let um = [
  { value_um: 0, value_imgw: 5.7, category: "forecast" },
  { value_um: 0, value_imgw: 6, category: "forecast" },
];

let imgw = [
  { value_um: 2, value_imgw: 10.7, category: "forecast" },
  { value_um: 2, value_imgw: 16, category: "forecast" },
];

function preprocessforTaucharts(um, imgw) {
  let diagonal = imgw.map((point) => ({
    value_um: point.value_imgw,
    value_imgw: point.value_imgw,
    category: "diagonal",
  }));
  return um.concat(imgw.concat(diagonal));
}

const defaultData = {
  type: "scatterplot",
  x: "value_um",
  y: "value_imgw",
  color: "category",
  data: preprocessforTaucharts(um, imgw),
};

export function ChartHistoricals(props) {
  const ref = useRef();
  const [state, setState] = React.useState(defaultData);

  const { historical_data, forecast_data } = useSelector(
    (state) => state.table
  );

  useEffect(() => {
    const data = [
      ...Object.values(historical_data || {}),
      ...Object.values(forecast_data || {}),
      ...defaultData.data,
    ];

    setState((state) => ({
      ...state,
      data,
    }));
  }, [historical_data, forecast_data]);

  useEffect(() => {
    const chart = new taucharts.Chart(state);
    chart.renderTo(ref.current);
    return () => {
      chart.destroy();
    };
  }, [state]);

  return (
    <>
      <div>Chart Historicals</div>
      <div ref={ref} />
    </>
  );
}

//remo
