import React from "react";
import { computeP, computeDescription } from "../../utils/statistics";

export function TableEntry({ value }) {
  const emptyArray = new Array(value.len_series).fill(true);

  return emptyArray.map((value) => {
    return (
      <>
        <tr>
          <td>{value.date_um.substr(0, 13)}</td>
          <td>{value.value_um}</td>
          <td>{computeP(value.value_um).toFixed(3)}</td>
          <td>{computeDescription(value.value_um, value.value_imgw)}</td>
          <td>{value.value_imgw}</td>
        </tr>
      </>
    );
  });
}
