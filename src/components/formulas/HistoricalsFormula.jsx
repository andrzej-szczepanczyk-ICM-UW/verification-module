import React from "react";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";

import { computeEffectiveness } from "../../utils/statistics";

import * as d3 from "d3";

import moment from "moment";

import {
  updateHistoricalData,
  updateHistoricalFilters,
} from "../../store/reducers/table/actions";

import "./formulas.css";

const nodeToString = ({ row, col, stationName }) =>
  `${row}, ${col}, ${stationName}`;

export function HistoricalsFormula() {
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table);
  const debouncedDispatch = debounce(dispatch, 100);

  const setFirstDate = (e) => {
    // console.log(
    //   "This is first date manipulation",
    //   e.target.value,
    //   "type is",
    //   typeof e.target.value
    // );

    const new_historical_filters = { ...table.historical_filters };
    new_historical_filters.firstDate = `${e.target.value}T00:00:00.000Z`;
    console.log(table.historical_filters);

    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  const setLastDate = (e) => {
    // console.log(
    //   "This is second date manipulation",
    //   e.target.value,
    //   "type is",
    //   typeof e.target.value
    // );

    const new_historical_filters = { ...table.historical_filters };
    new_historical_filters.lastDate = `${e.target.value}T00:00:00.000Z`;
    //console.log(table.historical_filters);
    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  const ourNodes = [
    { row: 266, col: 161, stationName: "KOLOBRZEG" },
    { row: 266, col: 170, stationName: "KOSZALIN" },
    { row: 276, col: 182, stationName: "USTKA" },
    { row: 281, col: 193, stationName: "LEBA" },
    { row: 275, col: 197, stationName: "LEBORK" },
    { row: 276, col: 214, stationName: "HEL" },
    { row: 271, col: 212, stationName: "GDANSK PORT PN." },
    { row: 269, col: 215, stationName: "GDANSK-SWIBNO" },
    { row: 266, col: 225, stationName: "ELBLAG-MILEJEWO" },
    { row: 262, col: 255, stationName: "KETRZYN" },
    { row: 265, col: 281, stationName: "SUWALKI" },
    { row: 260, col: 139, stationName: "SWINOUJSCIE" },
    { row: 245, col: 144, stationName: "SZCZECIN" },
    { row: 255, col: 157, stationName: "RESKO-SMOLSKO" },
    { row: 236, col: 179, stationName: "PILA" },
    { row: 252, col: 192, stationName: "CHOJNICE" },
    { row: 233, col: 210, stationName: "TORUN" },
    { row: 235, col: 239, stationName: "MLAWA" },
    { row: 253, col: 240, stationName: "OLSZTYN" },
    { row: 254, col: 259, stationName: "MIKOLAJKI" },
    { row: 236, col: 286, stationName: "BIALYSTOK" },
    { row: 226, col: 154, stationName: "GORZOW WLKP" },
    { row: 216, col: 142, stationName: "SLUBICE" },
    { row: 216, col: 180, stationName: "POZNAN-LAWICA" },
    { row: 210, col: 211, stationName: "KOLO" },
    { row: 220, col: 229, stationName: "PLOCK" },
    { row: 209, col: 250, stationName: "WARSZAWA-OKECIE" },
    { row: 210, col: 272, stationName: "SIEDLCE" },
    { row: 208, col: 295, stationName: "TERESPOL" },
    { row: 204, col: 157, stationName: "ZIELONA GORA" },
    { row: 183, col: 168, stationName: "LEGNICA" },
    { row: 200, col: 174, stationName: "LESZNO" },
    { row: 180, col: 180, stationName: "WROCLAW II" },
    { row: 198, col: 200, stationName: "KALISZ" },
    { row: 182, col: 208, stationName: "WIELUN" },
    { row: 196, col: 223, stationName: "LODZ-LUBLINEK" },
    { row: 186, col: 231, stationName: "SULEJOW" },
    { row: 192, col: 260, stationName: "KOZIENICE" },
    { row: 183, col: 275, stationName: "LUBLIN RADAWIEC" },
    { row: 194, col: 294, stationName: "WLODAWA" },
    { row: 175, col: 160, stationName: "JELENIA GORA" },
    { row: 170, col: 159, stationName: "SNIEZKA" },
    { row: 161, col: 174, stationName: "KLODZKO" },
    { row: 166, col: 198, stationName: "OPOLE" },
    { row: 150, col: 202, stationName: "RACIBORZ" },
    { row: 171, col: 218, stationName: "CZESTOCHOWA" },
    { row: 155, col: 217, stationName: "KATOWICE-MUCHOWICE" },
    { row: 151, col: 230, stationName: "KRAKOW-BALICE" },
    { row: 171, col: 246, stationName: "KIELCE-SUKOW" },
    { row: 150, col: 251, stationName: "TARNOW" },
    { row: 152, col: 270, stationName: "RZESZOW-JASIONKA" },
    { row: 168, col: 264, stationName: "SANDOMIERZ" },
    { row: 170, col: 290, stationName: "ZAMOSC" },
    { row: 143, col: 216, stationName: "BIELSKO-BIALA" },
    { row: 129, col: 233, stationName: "ZAKOPANE" },
    { row: 127, col: 234, stationName: "KASPROWY WIERCH" },
    { row: 138, col: 246, stationName: "NOWY SACZ" },
    { row: 141, col: 266, stationName: "KROSNO" },
    { row: 135, col: 276, stationName: "LESKO" },
  ];

  const fillRowCol = (e) => {
    // console.log("my whole state is !!!!: ", table);
    // console.log("row is ", table.historical_filters.row);
    // console.log("col is ", table.historical_filters.col);
    // console.log("event is:", e);

    let new_historical_filters = { ...table.historical_filters };
    const [row, col] = e.target.value.split(", ");
    new_historical_filters.row = row;
    new_historical_filters.col = col;
    new_historical_filters.stationName = col;

    debouncedDispatch(updateHistoricalFilters(new_historical_filters));
  };

  let filter_data = (rawData, settings) => {
    if (settings == undefined) {
      return rawData;
    } else {
      let allYMDdates = computeAverages(rawData)
        .filter((obj) => obj[settings.avgPositive] > 0)
        .map((obj) => obj.key);
      console.log("allYMDdates", allYMDdates);
      let filteredData = rawData.filter((doc) => {
        let YMDdate = moment(doc.date_um, "Y-MM-DDT00:00:00.000Z")
          .utc()
          .format("Y-MM-DD");
        return allYMDdates.find((i) => i == YMDdate);
      });
      return filteredData;
    }
  };

  let computeAverages = (data) => {
    let getParam = function (arr, param) {
      let simpleArray = arr.map((obj) => obj[param]);
      let sum = simpleArray.reduce((a, b) => a + b);
      return sum / simpleArray.length;
    };

    let data2 = d3
      .nest()
      .key((obj) =>
        moment(obj.date_um, "Y-MM-DDT00:00:00.000Z").utc().format("Y-MM-DD")
      )
      .rollup(function (arr) {
        return {
          avg_imgw: getParam(arr, "value_imgw"),
          avg_um: getParam(arr, "value_um"),
        };
      })
      .entries(data);

    let dataCollapseNode = data2.map((obj) => {
      let newObj = { ...obj.value, ...obj };
      delete newObj.value;
      return newObj;
    });

    return dataCollapseNode;
  };

  let mockUmimgw = (args) => {
    let start = moment(args.firstDate, "YYYY-MM-DDT00:00:00.000Z");
    let end = moment(args.lastDate, "YYYY-MM-DDT00:00:00.000Z");

    let listDates = [];
    while (start < end) {
      listDates.push(new Date(start));
      start.add(1, "hour");
    }

    let mockData = listDates.map((date, index) => {
      return {
        date_um: date,
        date_imgw: date,
        value_um: index - 250,
        value_imgw: index - 400,
      };
    });
    return mockData;
  };

  const handleUpdateFilters = () => {
    const { row, col, firstDate, lastDate } = table.historical_filters;
    let jres;
    let type = "forecast";
    let mock = true;
    if (mock) {
      jres = mockUmimgw(table.historical_filters);
      dispatch(updateHistoricalData(jres));
    } else {
      let query = `http://localhost:3001/api/mongodata/filter?way=${type}&row=${row}&col=${col}&firstDate=${firstDate}&lastDate=${lastDate}`;
      jres = fetch(query)
        .then((response) => {
          console.log("HistoricalsFormula: response is: ", response);
          return response.json();
        })
        .then((jres) => {
          dispatch(updateHistoricalData(jres));
          return jres;
        });
    }

    let config1 = undefined;
    let config2 = { avgPositive: "avg_imgw" };

    let comment1 = `"for all data:\t"${computeEffectiveness(
      filter_data(jres, config1)
    )}for positive average\t${computeEffectiveness(
      filter_data(jres, config2)
    )}`;
    document.getElementById("textarea1").innerHTML += comment1;

    document.getElementById("textarea2").innerHTML = JSON.stringify(
      computeAverages(jres)
    );
  };

  return (
    <div id="StatisticalsFormula">
      choose Node:
      <select id="select1" onChange={fillRowCol}>
        {ourNodes.map((node) => {
          const nodeStr = nodeToString(node);

          return (
            <option key={nodeStr} value={nodeStr}>
              {nodeStr}
            </option>
          );
        })}
      </select>
      <p id="rowText">row</p>
      <input id="rowInput" value={table.historical_filters.row}></input>
      <p id="colText">col</p>
      <input id="colInput" value={table.historical_filters.col}></input>
      <p id="colText">Choose Date range</p>
      <input
        onChange={setFirstDate}
        id="firstDate"
        type="date"
        defaultValue={table.historical_filters.firstDate?.substring(0, 10)}
      />
      <input
        id="lastDate"
        type="date"
        onChange={setLastDate}
        defaultValue={table.historical_filters.lastDate?.substring(0, 10)}
      />
      <br></br>
      <textarea id="textarea1"></textarea>
      <textarea id="textarea2"></textarea>
      <button onClick={handleUpdateFilters}>Run!</button>
    </div>
  );
}
