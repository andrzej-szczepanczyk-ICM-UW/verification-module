import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSlope,
  updateIntercept,
} from "../../store/reducers/table/actions";
import { debounce } from "debounce";

export function StatisticalsFormula() {
  const dispatch = useDispatch();
  //const { slope, intercept } = useSelector((state) => state.table);
  const table = useSelector((state) => state.table);
  const debouncedDispatch = debounce(dispatch, 100);

  const handleSlopeChange = (e) => {
    debouncedDispatch(updateSlope(Number(e.target.value) / 100));
  };

  const handleInterceptChange = (e) => {
    debouncedDispatch(updateIntercept(Number(e.target.value) / 100));
  };

  return (
    <div>
      <div>
        Sigmoid: slope
        <b>{table.slope}</b>
        <br />
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={table.slope * 100}
          onChange={handleSlopeChange}
        />
      </div>

      <div>
        Sigmoid: intercept
        <b>{table.intercept}</b>
        <br />
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={table.intercept * 100}
          onChange={handleInterceptChange}
        />
      </div>
      <div>
        Wartość progowa: <b>10%</b>
      </div>
    </div>
  );
}
