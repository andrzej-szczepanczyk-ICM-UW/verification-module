import React from "react";

import { ForecastFormula } from "../formulas/ForecastFormula";
import { Table } from "../table/Table";
import { StatisticalsFormula } from "../formulas/StatisticalsFormula";

import { HistoricalsFormula } from "../formulas/HistoricalsFormula";
import { ChartHistoricals } from "../graph/ChartHistoricals";
import { Effectiveness } from "../graph/Effectiveness";

import "./dashboard.css";

export function Dashboard() {
  // const dispatch = useDispatch();
  // const { firstDate, lastDate } = useSelector((state) => state.table);

  // React.useEffect(() => {
  //   console.log("QUERY", `/?from=${firstDate || ""}&to=${lastDate || ""}`);
  //   fetch(
  //     `http://localhost:3003/?from=${firstDate || "2016-06-06T00:00:00"}&to=${
  //       lastDate || "2016-06-07T00:00:00"
  //     }`
  //   )
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then((json) => {
  //       console.log(json);
  //       console.log("length", JSON.stringify(json).length);
  //       dispatch(addData(json));
  //     });
  // }, [dispatch, firstDate, lastDate]);

  return (
    <div id="dashboard">
      <div id="forecast-column">
        <ForecastFormula class="formulas"></ForecastFormula>
        <StatisticalsFormula class="settings"></StatisticalsFormula>
        <Table class="formulas"></Table>
      </div>
      <div id="historicals-column">
        <HistoricalsFormula class="formulas"></HistoricalsFormula>
        <ChartHistoricals class="chart"></ChartHistoricals>
        <Effectiveness></Effectiveness>
      </div>
    </div>
  );
}
