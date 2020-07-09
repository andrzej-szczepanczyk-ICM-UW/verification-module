import React from "react";
import { useSelector } from "react-redux";
import { TableEntry } from "./TableEntry";
import "./table.css";

export function Table() {
  const table = useSelector((state) => state.table);
  const forecast_data = table.forecast_data;
  //const mockdata = [1, 4, 5, 66, 77, 8, 9, 10];

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
      {forecast_data.map((row) => (
        <TableEntry value={row} />
      ))}
    </table>
  );
}
