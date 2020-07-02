import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import taucharts from "taucharts";

const defaultData = {
  type: "scatterplot",
  x: "value_um",
  y: "value_imgw",
  data: [
    { value_um: 1, value_imgw: 1 },
    { value_um: 2, value_imgw: 2 },
    { value_um: 2, value_imgw: 2 },
    { value_um: 2, value_imgw: 5 },
    { value_um: 2, value_imgw: 5.5 },
    { value_um: 2, value_imgw: 5.7 },
    { value_um: 2, value_imgw: 6 },
  ],
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
