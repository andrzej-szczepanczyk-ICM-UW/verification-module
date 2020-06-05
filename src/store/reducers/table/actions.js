// add data, update_slope, update_intercept

export const ADD_DATA = "ADD_DATA";
export const UPDATE_SLOPE = "UPDATE_SLOPE";
export const UPDATE_INTERCEPT = "UPDATE_INTERCEPT";
export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const UPDATE_NODE = "UPDATE_NODE";

export const addData = (data, someotherData) => ({
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

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  filters,
});

export const updateNode = (node) => ({
  type: UPDATE_NODE,
  node,
});
