import React from "react";
import { useSelector } from "react-redux";
import { TableEntry } from "./TableEntry";
import "./table.css";

export function Table() {
  const UmImgwPair = useSelector((state) => state.UmImgwPair);
  const forecast_data = UmImgwPair.forecast_data;

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
        <TableEntry key={row} value={row} />
      ))}
    </table>
  );
}
