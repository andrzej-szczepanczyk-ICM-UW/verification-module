import React from "react";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";

import {
  updateHistoricalData,
  updateHistoricalFilters,
} from "../../store/reducers/table/actions";

import "./formulas.css";

const nodeToString = ({ row, col }) => `${row}, ${col}`;

export function HistoricalsFormula() {
  const dispatch = useDispatch();
  const s = useSelector((state) => state.table); // change s to table
  const debouncedDispatch = debounce(dispatch, 100);

  const setFirstDate = (e) => {
    console.log(
      "This is first date manipulation",
      e.target.value,
      "type is",
      typeof e.target.value
    );

    const new_historical_filters = { ...s.historical_filters };
    new_historical_filters.firstDate = `${e.target.value}T00:00:00.000Z`;
    console.log(s.historical_filters);

    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  const setLastDate = (e) => {
    console.log(
      "This is second date manipulation",
      e.target.value,
      "type is",
      typeof e.target.value
    );

    const new_historical_filters = { ...s.historical_filters };
    new_historical_filters.lastDate = `${e.target.value}T00:00:00.000Z`;
    console.log(s.historical_filters);

    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  const our_nodes = [
    { row: 211, col: 233 },
    { row: 1, col: 2 },
    { row: 11, col: 22 },
  ];

  const fillRowCol = (e) => {
    console.log("my whole state is !!!!: ", s);
    console.log("row is ", s.historical_filters.row);
    console.log("col is ", s.historical_filters.col);
    console.log("event is:", e);

    let new_historical_filters = { ...s.historical_filters };
    const [row, col] = e.target.value.split(", ");
    new_historical_filters.row = row;
    new_historical_filters.col = col;

    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  const handleUpdateFilters = () => {
    const { row, col, firstDate, lastDate } = s.historical_filters;

    let type = "forecast";
    let query_string = `http://localhost:3001/api/mongodata/filter?way=${type}&row=${row}&col=${col}&firstDate=${firstDate}&lastDate=${lastDate}`;
    console.log("state is", s);
    console.log("query_string is", query_string);

    fetch(query_string)
      .then((response) => {
        console.log("response is: ", response);
        return response.json();
      })
      .then((res) => {
        document.getElementById("mytextarea").innerHTML = JSON.stringify(
          res,
          null,
          2
        );
        console.warn("data are: ", res);
        let debouncedDispatch = debounce(dispatch, 1000);
        debouncedDispatch(updateHistoricalData(res));
      });
  };

  const currentNodeStr = nodeToString(s.historical_filters);

  return (
    <div id="TableConfig">
      choose Node:
      <select onChange={fillRowCol} value={currentNodeStr}>
        {our_nodes.map((node) => {
          const nodeStr = nodeToString(node);

          return (
            <option
              key={nodeStr}
              value={nodeStr}
              selected={nodeStr === currentNodeStr}
            >
              {nodeStr}
            </option>
          );
        })}
      </select>
      <p id="rowText">row</p>
      <input id="rowInput" value={s.historical_filters.row}></input>
      <p id="colText">col</p>
      <input id="colInput" value={s.historical_filters.col}></input>
      <p id="colText">Choose Date range</p>
      <input
        onChange={setFirstDate}
        id="firstDate"
        type="date"
        defaultValue={s.historical_filters.firstDate?.substring(0, 10)}
      />
      <input
        id="lastDate"
        type="date"
        onChange={setLastDate}
        defaultValue={s.historical_filters.lastDate?.substring(0, 10)}
      />
      <br></br>
      <textarea id="mytextarea"></textarea>
      <button onClick={handleUpdateFilters}>Run!</button>
    </div>
  );
}
