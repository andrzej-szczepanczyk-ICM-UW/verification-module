import React from "react";
import { useSelector } from "react-redux";
import { TableEntry } from "./TableEntry";
import "./table.css";

export function Table() {
  const table = useSelector((state) => state.table);
  const forecast_data = table.forecast_data;

  return <textarea>{forecast_data}</textarea>;

  // return (
  //   <table className="table">
  //     <thead>
  //       <tr>
  //         <td>date</td>
  //         <td>um</td>
  //         <td>p</td>
  //         <td>description</td>
  //         <td>imgw</td>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {forecast_data.map((moment) => (
  //         //<TableEntry key={moment['um']} date={moment['um']} value={moment['']} />
  //       ))}
  //     </tbody>
  //   </table>
  // );
}
