import { SET_REQUESTS } from "./actions";

const initialTimerState = {
  requests: [],
};

export const inBound = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case SET_REQUESTS:
      return {
        ...state,
        requests: [...state.requests, payload],
      };
    default:
      return state;
  }
};
