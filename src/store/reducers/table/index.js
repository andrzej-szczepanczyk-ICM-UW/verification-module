import {
  ADD_DATA,
  UPDATE_SLOPE,
  UPDATE_INTERCEPT,
  UPDATE_FILTERS,
} from "./actions";

const defaultState = {
  slope: 0.15,
  intercept: 0.15,
  forecast_data: {},
  historicals_data: {},
  historicals_filters: {
    firstYear: 2016,
    lastYear: 2019,
    firstDate: "2010-06-01T00:00:00",
    lastDate: "2010-10-01T00:00:00",
    firstHour: 0,
    lastHour: 21,
  },

  forecast_filters: {
    lastDate: "2010-10-01T00:00:00",
  },
};

export function table(state = defaultState, action) {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        forecast_data: {
          ...state.data,
          ...action.payload,
        },
      };
    case UPDATE_SLOPE:
      return {
        ...state,
        slope: action.slope,
      };
    case UPDATE_INTERCEPT:
      return {
        ...state,
        intercept: action.intercept,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        intercept: action.intercept,
      };
    default:
      return state;
  }
}
