import React from "react";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";

import {
  updateHistoricalData,
  updateHistoricalFilters,
} from "../../store/reducers/table/actions";

import "./formulas.css";
// import queryString from "query-string";
// import { getStoredState } from "redux-persist";

export function HistoricalsFormula() {
  //redux management
  const dispatch = useDispatch();
  const s = useSelector((state) => state.table);
  const debouncedDispatch = debounce(dispatch, 100);

  const setFirstDate = (e) => {
    console.log(
      "This is first date manipulation",
      e.target.value,
      "type is",
      typeof e.target.value
    );

    let new_historical_filters = s.historical_filters;
    new_historical_filters.firstDate = `${e.target.value}T00:00:00.000Z`;
    console.log(s.historical_filters);

    debouncedDispatch(updateHistoricalFilters(s.historical_filters));
  };

  const setLastDate = (e) => {
    console.log(
      "This is second date manipulation",
      e.target.value,
      "type is",
      typeof e.target.value
    );

    let new_historical_filters = s.historical_filters;
    new_historical_filters.lastDate = `${e.target.value}T00:00:00.000Z`;
    console.log(s.historical_filters);

    debouncedDispatch(updateHistoricalFilters(s.historical_filters));
  };

  let our_nodes = [
    { row: 211, col: 233 },
    { row: 1, col: 2 },
    { row: 11, col: 22 },
  ];

  const fillRowCol = (e) => {
    console.log("my whole state is !!!!: ", s);
    console.log("row is ", s.historical_filters.row);
    console.log("col is ", s.historical_filters.col);
    console.log("event is:", e);

    let new_historical_filters = s.historical_filters;
    new_historical_filters.row = 210; //e.target.value.row;
    new_historical_filters.col = 271; //e.target.value.col;
    console.log(s.historical_filters);
    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  let handleUpdateFilters = () => {
    let row = s.historical_filters.row;
    let col = s.historical_filters.col;
    let first = s.historical_filters.firstDate;
    let last = s.historical_filters.lastDate;
    let type = "forecast";
    let query_string = `http:localhost:3001/api/mongodata/filterby${type}?row=${row}&col=${col}&firstDate=${first}&lastDate=${last}`;
    console.log("state is", s);
    console.log("query_string is", query_string);
    fetch(query_string)
      .then((response) => {
        let unpacked_res = JSON.stringify(response);
        return unpacked_res; //response.json();
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

  return (
    <div id="TableConfig">
      <>
        Historicals FORMULA
        <br></br>
        choose Node:
        <select onChange={fillRowCol} value={s.historical_filters.row}>
          {our_nodes.map((node, key) => (
            <option key={key} value={node}>
              {node.row + ", " + node.col}
            </option>
          ))}
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
          defaultValue={"2010-06-01T00:00:00.000Z"}
        />
        <input
          id="lastDate"
          type="date"
          onChange={setLastDate}
          defaultValue={"2010-10-01T00:00:00.000Z"}
        />
        <br></br>
        <textarea id="mytextarea"></textarea>
        <button onClick={handleUpdateFilters}>Run!</button>
      </>
    </div>
  );
}
