import React from "react";
import { useSelector } from "react-redux";
import "./formulas.css";

export function ForecastFormula() {
  return (
    <>
      <div id="formulas">Forecast FORMULA.</div>
      Choose Date of forecast:
      <input type="date"></input>
    </>
  );
}
