import {
  ADD_DATA,
  UPDATE_SLOPE,
  UPDATE_INTERCEPT,
  UPDATE_FILTERS,
} from "./actions";

const defaultState = {
  slope: 0.15,
  intercept: 0.15,
  node: {
    id: 0,
    row: 0,
    col: 0,
    description: "",
  },
  forecast: {
    start: 0,
  },
  filters: {
    firstYear: 2016,
    lastYear: 2019,
    firstDate: "2020-06-01T00:00:00",
    lastDate: "2020-10-01T00:00:00",
    firstHour: 0,
    lastHour: 21,
  },

  data: {},
};

export function table(state = defaultState, action) {
  //komentarz od korepetytora
  //const state = store.getState();
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: {
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
        firstDate: action.firstDate,
      };
    default:
      return state;
  }
}
