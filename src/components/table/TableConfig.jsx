import React from "react";
import "./table.css";
import {
  updateSlope,
  updateIntercept,
} from "../../store/reducers/table/actions";
import { debounce } from "debounce";

import { useSelector, useDispatch } from "react-redux";

export function TableConfig() {
  const dispatch = useDispatch();
  const { slope, intercept } = useSelector((state) => state.table);
  const debouncedDispatch = debounce(dispatch, 100);

  const handleSlopeChange = (e) => {
    debouncedDispatch(updateSlope(Number(e.target.value) / 100));
  };

  const handleInterceptChange = (e) => {
    debouncedDispatch(updateIntercept(Number(e.target.value) / 100));
  };

  return (
    <>
      TableConfig: Slope: <strong>{slope}</strong>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={slope * 100}
        onChange={handleSlopeChange}
      />
      intercept: <strong>{intercept}</strong>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={intercept * 100}
        onChange={handleInterceptChange}
      />
    </>
  );
}
