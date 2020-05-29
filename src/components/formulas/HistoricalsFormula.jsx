import React from "react";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";

import { updateFilters } from "../../store/reducers/table/actions";

import "./formulas.css";

export function HistoricalsFormula() {
  const dispatch = useDispatch();
  const { firstDate, lastDate } = useSelector((state) => state.table);
  const debouncedDispatch = debounce(dispatch, 100);

  const handleUpdateFilters = (e) => {
    debouncedDispatch(updateFilters(e.target.value));
  };

  return (
    <div id="TableConfig">
      <>
        Historicals FORMULA
        <br></br>
        choose Node:
        <select>
          <option>łeba urban</option>
          <option>łeba forest</option>
          <option>Poligon Wojskowy Orzysz</option>
          <option>kotlina jeleniogórska</option>
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
        <input id="firstDate" type="date" defaultValue={firstDate} />
        <input id="lastDate" type="date" defaultValue={lastDate} />
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
        <button onclick={handleUpdateFilters}>Run!</button>
      </>
    </div>
  );
}
