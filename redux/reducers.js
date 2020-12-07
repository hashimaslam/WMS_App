import { combineReducers } from "redux";
import { inBound } from "../modules/inbound/reducer";
import { outBound } from "../modules/outbound/reducer";
// COMBINED REDUCERS
const reducers = {
  inBound,
  outBound,
};

export default combineReducers(reducers);
