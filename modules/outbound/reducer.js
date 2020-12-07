import {
  SET_PARTDATA,
  SET_BODYOBJ,
  SET_ERROR,
  SET_PART_BARCODE,
} from "./actions";

const initialState = {
  partData: [],
  partBarcode: null,
  error: {
    status: false,
    message: "",
  },
  bodyObj: {
    type: "outbound",
    action: "scan",
    data: "",
  },
};

export const outBound = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PARTDATA:
      return {
        ...state,
        partData: payload,
      };
    case SET_BODYOBJ:
      return {
        ...state,
        bodyObj: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    case SET_PART_BARCODE:
      return {
        ...state,
        partBarcode: payload,
      };
    default:
      return state;
  }
};
