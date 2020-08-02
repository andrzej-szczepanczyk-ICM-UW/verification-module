import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import tauCharts from "taucharts";

// const taggedForecast = forecast.map((point) => ({
//   value_um: point.value_um,
//   value_imgw: point.value_imgw,
//   category: `forecastDoba`,
// }));

// const diagonal = taggedForecast.map((point) => ({
//   value_um: point.value_imgw,
//   value_imgw: point.value_imgw,
//   category: "diagonal",
// }));
// return taggedForecast.concat(taggedHistorical.concat(diagonal));

const defaultData = {
  type: "scatterplot",
  x: "value_um",
  y: "value_imgw",
  color: "category",
  data: [{ value_um: 0, value_imgw: 0, category: "none" }],
  plugins: [
    tauCharts.api.plugins.get("tooltip"),
    tauCharts.api.plugins.get("legend"),
  ],
};

function tagHist(hist) {
  return hist
    .map((point) => ({
      value_um: point.value_um,
      value_imgw: point.value_imgw,
      category: "historical",
    }))
    .filter((point) => !isNaN(point.value_imgw));
}

function tagForecast(forecast) {
  console.log("hist is:", forecast);
  return forecast
    .map((point) => ({
      value_um: point.value_um,
      value_imgw: point.value_imgw,
      category: "forecast",
    }))
    .filter((point) => !isNaN(point.value_imgw));
}

export function ChartHistoricals() {
  const ref = useRef();
  const [state, setState] = React.useState(defaultData);

  const { historical_data, forecast_data } = useSelector(
    (state) => state.table
  );

  useEffect(() => {
    console.log(
      "ChartHistoricals: tagHist(historical_data) is",
      tagHist(historical_data)
    );
    let data = [
      ...Object.values(historical_data || {}),
      ...Object.values(tagForecast(forecast_data) || {}),
      ...defaultData.data,
    ];

    // let data = [
    //   { value_um: 0.475, value_imgw: 4.274, category: "historical" },
    //   { value_um: -0.4, value_imgw: 4.643, category: "historical" },
    //   { value_um: 0.375, value_imgw: 4.274, category: "f" },
    //   { value_um: -0.7, value_imgw: 8.643, category: "f" },
    // ];

    setState((state) => ({
      ...state,
      data,
    }));
  }, [historical_data, forecast_data]);

  useEffect(() => {
    console.log("ChartHistoricals: state is", state);
    const chart = new tauCharts.Chart(state);
    chart.renderTo(ref.current);
    return () => {
      chart.destroy();
    };
  }, [state]);

  return (
    <>
      <div>Chart</div>
      <div ref={ref} />
    </>
  );
}
