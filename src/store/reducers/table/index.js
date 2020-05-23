import {
  ADD_DATA,
  UPDATE_SLOPE,
  UPDATE_INTERCEPT,
  UPDATE_FIRST_DATE,
  UPDATE_LAST_DATE,
} from "./actions";

const defaultState = {
  slope: 0.15,
  intercept: 0.15,
  firstDate: null,
  lastDate: null,
  data: {},
};

export function table(state = defaultState, action) {
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
    case UPDATE_FIRST_DATE:
      return {
        ...state,
        firstDate: action.firstDate,
      };
    case UPDATE_LAST_DATE:
      return {
        ...state,
        lastDate: action.lastDate,
      };
    default:
      return state;
  }
}
