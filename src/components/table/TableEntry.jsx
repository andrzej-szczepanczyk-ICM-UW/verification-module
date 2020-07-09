import React from "react";
import moment from "moment";
import { computeMockSigmoid } from "../../utils/computeMockSigmoid";
import { useSelector } from "react-redux";

export function TableEntry({ value }) {
  console.log({ value });
  const { slope, intercept } = useSelector((state) => state.table);
  // const momentDate = moment(date);
  const emptyArray = new Array(value.len_series).fill(true);

  return emptyArray.map((x, index) => {
    // const currentDate = moment(+momentDate)
    //   .add(moment.duration(index, "hours"))
    //   .format("YYYY-MM-DDTHH:00:00");

    return (
      // <tr>
      //   <td>{value.date}</td>
      //   <td>{value.value_um}</td>
      //   <td>{computeMockSigmoid(value.um, slope, intercept).toFixed(3)}</td>
      //   <td>brak przymrozka</td>
      //   <td>{value.imgw}</td>
      // </tr>

      <tr>
        <td>date</td>
        <td>value_um</td>
        <td>probability</td>
        <td>brak przymrozka</td>
        <td>imgw</td>
      </tr>
    );
  });
}
