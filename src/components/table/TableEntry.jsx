import React from "react";
import moment from "moment";
// import { computeMockSigmoid } from "../../utils/statistics.js";
import { useSelector } from "react-redux";

export function TableEntry({ date, value }) {
  console.log({ value });
  const { slope, intercept } = useSelector((state) => state.table);
  console.log("slope is", slope);
  const momentDate = moment(date);
  const emptyArray = new Array(value.len_series).fill(true);

  return (
    <>
      TableEntry
      {emptyArray.map((x, index) => {
        const currentDate = moment(+momentDate)
          .add(moment.duration(index, "hours"))
          .format("YYYY-MM-DDTHH");
        console.error("VALUE", value);

        //const p = computeMockSigmoid(value.um[index], slope, intercept).toFixed(
        //   2
        // );

        return (
          <tr key={currentDate}>
            <td>{currentDate}</td>
            <td>{value.um[index]}</td>
            <td>0</td>
            <td>brak przymrozka</td>
            <td>{value.imgw[index]}</td>
          </tr>
        );
      })}
    </>
  );
}
