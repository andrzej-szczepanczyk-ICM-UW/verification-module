import React from "react";
import TauChart from "taucharts-react";

const chartData = [1, 2, 3];
const chartOptions = ["a", 2, 6];

export function ChartHistoricals() {
  return (
    <>
      <div>Chart Historicals</div>
      <TauChart ref="myref" data={chartData} options={chartOptions} />
    </>
  );
}
