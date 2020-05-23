// add data, update_slope, update_intercept

export const ADD_DATA = "ADD_DATA";
export const UPDATE_SLOPE = "UPDATE_SLOPE";
export const UPDATE_INTERCEPT = "UPDATE_INTERCEPT";
export const UPDATE_FIRST_DATE = "UPDATE_FIRST_DATE";
export const UPDATE_LAST_DATE = "UPDATE_LAST_DATE";

export const addData = (data) => ({
  type: ADD_DATA,
  payload: data,
});

export const updateSlope = (slope) => ({
  type: UPDATE_SLOPE,
  slope,
});

export const updateIntercept = (intercept) => ({
  type: UPDATE_INTERCEPT,
  intercept,
});

export const updateFirstDate = (firstDate) => ({
  type: UPDATE_INTERCEPT,
  firstDate,
});

export const updateSecondDate = (lastDate) => ({
  type: UPDATE_INTERCEPT,
  lastDate,
});
