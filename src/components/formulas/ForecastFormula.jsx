import React from "react";
import "./formulas.css";
import { debounce } from "debounce";
import { useDispatch, useSelector } from "react-redux";

import {
  updateForecastData,
  updateForecastFilters,
} from "../../store/reducers/UmImgwPair/actions";

export function ForecastFormula() {
  let myState = {
    hour: "00",
  };

  const type = "oneforecast";
  const UmImgwPair = useSelector((state) => state.UmImgwPair);
  const forecast_data = UmImgwPair.forecast_data;

  const dispatch = useDispatch();
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
        dispatch(updateForecastData(jres));
      });
  };

  const setForecastDate = (e) => {
    const new_forecast_filters = { ...UmImgwPair.forecast_filters };
    new_forecast_filters.forecastDate = `${e.target.value}T${myState.hour}:00:00.000Z`;
    dispatch(updateForecastFilters(new_forecast_filters));
  };

  const changeHour = (h) => {
    myState.hour = h;
    let { forecastDate } = UmImgwPair.forecast_filters;
    forecastDate = `${forecastDate.substring(0, 11)}${
      myState.hour
    }${forecastDate.substring(13)}`;
    dispatch(updateForecastFilters({ forecastDate }));
  };

  return (
    <>
      <div id="formulas"></div>
      FORECAST: Choose Date
      <input
        type="date"
        onChange={setForecastDate}
        defaultValue={forecastDate?.substring(0, 10)}
      />
      FORECAST: Choose Hour
      {["00", "06", "12", "18"].map((h) => {
        return (
          <div>
            <input
              type="radio"
              id={h}
              name="chooseHour"
              value={h}
              onClick={() => changeHour(h)}
            />
            <label>{h}</label>
          </div>
        );
      })}
      <button onClick={loadForecast}>Load Forecast</button>
      <textarea id="myForecastextarea">
        {JSON.stringify(forecast_data, null, 2)}
      </textarea>
    </>
  );
}
