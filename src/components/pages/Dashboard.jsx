import React from "react";

import { ForecastFormula } from "../formulas/ForecastFormula";
import { Table } from "../table/table";
import { StatisticalsFormula } from "../formulas/StatisticalsFormula";

import { HistoricalsFormula } from "../formulas/HistoricalsFormula";
import { ChartHistoricals } from "../graph/ChartHistoricals";
import { MockEffectiveness } from "../graph/MockEffectiveness";

import "./dashboard.css";

export function Dashboard() {
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
        <MockEffectiveness></MockEffectiveness>
      </div>
    </div>
  );
}
