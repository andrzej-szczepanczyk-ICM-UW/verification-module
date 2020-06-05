import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import taucharts from "taucharts";

// const chartData = [1, 2, 3];
var chartData = [
  {
    team: "d",
    cycleTime: 1,
    effort: 1,
    count: 1,
    priority: "low",
  },
  {
    team: "d",
    cycleTime: 2,
    effort: 2,
    count: 5,
    priority: "low",
  },
  {
    team: "d",
    cycleTime: 3,
    effort: 3,
    count: 8,
    priority: "medium",
  },
  {
    team: "d",
    cycleTime: 4,
    effort: 4,
    count: 3,
    priority: "high",
  },
  {
    team: "l",
    cycleTime: 2,
    effort: 1,
    count: 1,
    priority: "low",
  },
  {
    team: "l",
    cycleTime: 3,
    effort: 2,
    count: 5,
    priority: "low",
  },
  {
    team: "l",
    cycleTime: 4,
    effort: 3,
    count: 8,
    priority: "medium",
  },
  {
    team: "l",
    cycleTime: 5,
    effort: 4,
    count: 3,
    priority: "high",
  },
  {
    team: "k",
    cycleTime: 2,
    effort: 4,
    count: 1,
    priority: "low",
  },
  {
    team: "k",
    cycleTime: 3,
    effort: 5,
    count: 5,
    priority: "low",
  },
  {
    team: "k",
    cycleTime: 4,
    effort: 6,
    count: 8,
    priority: "medium",
  },
  {
    team: "k",
    cycleTime: 5,
    effort: 8,
    count: 3,
    priority: "high",
  },
];

const config = {
  type: "scatterplot",
  x: "cycleTime",
  y: "effort",
  color: "team",
  size: "count",
  data: chartData,
};
export function ChartHistoricals(props) {
  const ref = useRef();
  useEffect(() => {
    const chart = new taucharts.Chart(config);
    chart.renderTo(ref.current);
    return () => {
      chart.destroy();
    };
  });

  return (
    <>
      <div>Chart Historicals</div>
      <div ref={ref} />
    </>
  );
}
