import React from "react";
import { useSelector } from "react-redux";
import { TableEntry } from "./TableEntry";
import "./table.css";

export function Table() {
  const { forecast_data } = useSelector((state) => state.table);
  //const dates = Object.keys(forecast_data)
  const dates = [];

  if (dates.length === 0) {
    return "Loading data...";
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <td>date</td>
          <td>um</td>
          <td>p</td>
          <td>description</td>
          <td>imgw</td>
        </tr>
      </thead>
      <tbody>
        {dates.map((date) => (
          <TableEntry key={date} date={date} value={forecast_data[date]} />
        ))}
      </tbody>
    </table>
  );
}
