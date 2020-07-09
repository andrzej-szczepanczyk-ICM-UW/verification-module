import React from "react";
import moment from "moment";
import { computeP, computeDescription } from "../../utils/statistics";
import { useSelector } from "react-redux";

export function TableEntry({ value }) {
  //console.log("value is", { value });
  const { slope, intercept } = useSelector((state) => state.table);
  // const momentDate = moment(date);
  const emptyArray = new Array(value.len_series).fill(true);

  return emptyArray.map((x, index) => {
    // const currentDate = moment(+momentDate)
    //   .add(moment.duration(index, "hours"))
    //   .format("YYYY-MM-DDTHH:00:00");

    return (
      <tr>
        <td>{value.date_um.substr(0, 13)}</td>
        <td>{value.value_um}</td>
        <td>{computeP(value.value_um).toFixed(3)}</td>
        <td>{computeDescription(value.value_um, value.value_imgw)}</td>
        <td>{value.value_imgw}</td>
      </tr>
    );
  });
}
