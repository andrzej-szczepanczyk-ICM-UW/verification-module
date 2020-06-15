import React from "react";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";

import { updateFilters, updateNode } from "../../store/reducers/table/actions";

import "./formulas.css";
import queryString from "query-string";

export function HistoricalsFormula() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.table.filters);
  const node = useSelector((state) => state.table.node);
  const slope = useSelector((state) => state.table.slope);
  const intercept = useSelector((state) => state.table.intercept);

  React.useEffect(() => {
    console.log(
      "data which I am going to send to servers as parameters are ",
      filters
    );
    let isCancelled = false;

    fetch(
      `http://localhost:3001/api/mongodata?${queryString.stringify(filters)}`
    )
      // I ve tried to convert response in a json format
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          // dispatch(setData(data))
          console.log("Hey, setting data with my ", data);
        }
        console.log("Hey, I received an answer", data);
      });

    return () => {
      isCancelled = true;
    };
  }, [filters, dispatch]);

  //const debouncedDispatch = debounce(dispatch, 100);

  const fillRowCol = () => {
    console.log("HEY, I am in fillRowCol!!");
    console.log("my node values are: ", node);
    console.log("my node values are: ", slope);
    console.log("my node values are: ", intercept);
    console.log("my node values are: ", filters);
  };

  const handleUpdateFilters = () => {
    let debouncedDispatch = debounce(dispatch, 1000);
    debouncedDispatch(
      updateFilters({
        firstYear: 2016,
        lastYear: 2019,
        firstDate: "2010-06-01T00:00:00",
        lastDate: "2010-10-01T00:00:00",
        firstHour: 0,
        lastHour: 21,
      })
    );
  };

  return (
    <div id="TableConfig">
      <>
        Historicals FORMULA
        <br></br>
        choose Node:
        <select onChange={fillRowCol}>
          <option>kotlina jeleniogórska</option>
          <option>okolice suwałk</option>
          <option>łeba forest</option>
          <option>łeba urban</option>
          <option>jeziora (Poligon woskowy ORZYSZ)</option>
        </select>
        <p id="rowText">row</p>
        <input id="rowInput"></input>
        <p id="colText">col</p>
        <input id="colInput"></input>
        <p id="colText">Choose Years Range</p>
        <select id="firstYear" type="select">
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
        </select>
        <select id="lastYear" type="select">
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
        </select>
        <p id="colText">Choose Date range</p>
        <input
          id="firstDate"
          type="date"
          defaultValue={"2010-06-01T00:00:00"}
        />
        <input id="lastDate" type="date" defaultValue={"2010-10-01T00:00:00"} />
        <p id="colText">Choose Hour Range</p>
        <select id="firstYear" type="select">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
        </select>
        <select id="lastYear" type="select">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
        </select>
        <p id="colText">Group Data by</p>
        <select id="groupType" type="select">
          <option value="hours">Group by hours</option>
          <option value="months">Group by months</option>
        </select>
        <br></br>
        <button onClick={handleUpdateFilters}>Run!</button>
      </>
    </div>
  );
}
