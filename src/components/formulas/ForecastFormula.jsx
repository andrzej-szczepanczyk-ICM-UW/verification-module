import React from "react";
import "./formulas.css";
import { debounce } from "debounce";
import { useDispatch, useSelector } from "react-redux";

import {
  updateForecastData,
  updateForecastFilters,
} from "../../store/reducers/UmImgwPair/actions";

export function ForecastFormula() {
  const type = "oneforecast";
  const UmImgwPair = useSelector((state) => state.UmImgwPair);
  const forecast_data = UmImgwPair.forecast_data;

  const dispatch = useDispatch();
  const debouncedDispatch = debounce(dispatch, 100);
  const { row, col } = UmImgwPair.historical_filters;
  const { forecastDate } = UmImgwPair.forecast_filters;

  const loadForecast = () => {
    console.log("row is", row, "col is", col);
    const query = `http://localhost:3001/api/mongodata/filter?way=${type}&row=${row}&col=${col}&forecastDate=${forecastDate}`;
    console.log("ForecastFormula: query is:", query);
    fetch(query)
      .then((response) => {
        //console.log("response is: ", response);
        return response.json();
      })
      .then((jres) => {
        //jres.map((v) => console.log("row is:", v));
        //console.log("Forecast Formula: IS ", jres);
        //console.warn("ForecastFormula: data are: ", jres);
        debouncedDispatch(updateForecastData(jres));

        //TODO zrobić to prez react
        // document.getElementById("myForecastextarea").innerHTML = JSON.stringify(
        //   forecast_data,
        //   null,
        //   2
        // );
        //console.log("forecast_data is", forecast_data);
      });
  };

  const setForecastDate = (e) => {
    // console.log(
    //   "This is first date manipulation",
    //   e.target.value,
    //   "type is",
    //   typeof e.target.value
    // );
    const new_forecast_filters = { ...UmImgwPair.forecast_filters };
    new_forecast_filters.forecastDate = `${e.target.value}T00:00:00.000Z`;
    //console.log(UmImgwPair.forecast_filters);

    debouncedDispatch(updateForecastFilters(new_forecast_filters));
  };

  return (
    <>
      <div id="formulas"></div>
      Choose Date of forecast:
      <input
        type="date"
        onChange={setForecastDate}
        defaultValue={forecastDate?.substring(0, 10)}
      />
      <button onClick={loadForecast}>Load Forecast</button>
      <textarea id="myForecastextarea">
        {JSON.stringify(forecast_data, null, 2)}
      </textarea>
    </>
  );
}
