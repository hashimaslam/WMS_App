import { combineReducers } from "redux";
import { inBound } from "../modules/inbound/reducer";
// COMBINED REDUCERS
const reducers = {
  inBound: inBound,
};

export default combineReducers(reducers);
