import React from "react";
import "./formulas.css";
import { debounce } from "debounce";
import { useDispatch, useSelector } from "react-redux";

import { updateForecastData } from "../../store/reducers/table/actions";

export function ForecastFormula() {
  const type = "forecast";
  const table = useSelector((state) => state.table);

  const dispatch = useDispatch();
  const debouncedDispatch = debounce(dispatch, 100);
  const { row, col } = table.historical_filters;
  const { forecastDate } = table.forecast_filters;

  const loadForecast = () => {
    console.log("row is", row, "col is", col);
    const query = `http://localhost:3001/api/mongodata/filter?way=${type}&row=${row}&col=${col}&firstDate=${forecastDate}&lastDate=${forecastDate}`;
    console.log("ForecastFormula: query is:", query);
    fetch(query)
      .then((response) => {
        console.log("response is: ", response);
        return response.json();
      })
      .then((jres) => {
        console.warn("ForecastFormula: data are: ", jres);
        debouncedDispatch(updateForecastData(jres));
      });
  };

  return (
    <>
      <div id="formulas"></div>
      Choose Date of forecast:
      <input type="date" defaultValue={forecastDate?.substring(0, 10)} />
      <button onClick={loadForecast}>Load Forecast</button>
    </>
  );
}
