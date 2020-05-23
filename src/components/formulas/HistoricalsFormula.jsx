import React from "react";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";

import {
  updateFirstDate,
  updateSecondDate,
} from "../../store/reducers/table/actions";

export function HistoricalsFormula() {
  const dispatch = useDispatch();
  const { firstDate, lastDate } = useSelector((state) => state.table);
  const debouncedDispatch = debounce(dispatch, 100);

  const handleFirstDateChange = (e) => {
    debouncedDispatch(updateFirstDate(e.target.value));
  };

  const handleLastDateChange = (e) => {
    debouncedDispatch(updateSecondDate(e.target.value));
  };

  return (
    <div id="TableConfig">
      <>
        Historicals FORMULA
        <p id="rowText">row</p>
        <div id="rowInput"></div>
        <p id="colText">col</p>
        <div id="colInput"></div>
        <p id="colText">Years</p>
        <input id="selectYears" type="select"></input>
        <p id="colText">first date in each year</p>
        <input
          id="firstDate"
          type="date"
          onChange={handleFirstDateChange}
          defaultValue={firstDate}
        />
        <p id="colText">last date in each year</p>
        <input
          id="lastDate"
          type="date"
          onChange={handleLastDateChange}
          defaultValue={lastDate}
        />
        <p id="colText"></p>
        <input id="firstHour" type="checkbox"></input>
        <p id="colText"></p>
        <input id="lastHour" type="checkbox"></input>
      </>
    </div>
  );
}
