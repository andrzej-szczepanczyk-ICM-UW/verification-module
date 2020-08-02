import {
  UPDATE_FORECAST_DATA,
  UPDATE_HISTORICAL_DATA,
  UPDATE_FORECAST_FILTERS,
  UPDATE_HISTORICAL_FILTERS,
  UPDATE_SLOPE,
  UPDATE_INTERCEPT,
} from "./actions";

const defaultState = {
  slope: 0.97,
  intercept: 0.084,
  forecast_data: [],
  historical_data: [],
  historical_filters: {
    firstDate: "2018-01-01T00:00:00.000Z",
    lastDate: "2018-01-03T00:00:00.000Z",
    row: 266,
    col: 161,
    stationName: "KOLOBRZEG",
  },

  forecast_filters: {
    forecastDate: "2018-01-04T00:00:00.000Z",
  },
};

export function table(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_FORECAST_DATA:
      return {
        ...state,
        forecast_data: [...action.data],
      };
    case UPDATE_HISTORICAL_DATA:
      return {
        ...state,
        historical_data: [...action.data],
      };
    case UPDATE_FORECAST_FILTERS:
      return {
        ...state,
        forecast_filters: {
          ...state.forecast_filters,
          ...action.filters,
        },
      };
    case UPDATE_HISTORICAL_FILTERS:
      return {
        ...state,
        historical_filters: {
          ...state.historical_filters,
          ...action.hist_filters,
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
    default:
      return state;
  }
}
