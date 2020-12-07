import {
  SET_PARTDATA,
  SET_LOCATIONDATA,
  SET_BODYOBJ,
  SET_ERROR,
  SET_PART_BARCODE,
} from "./actions";

const initialState = {
  partData: [],
  locationData: [],
  partBarcode: null,
  error: {
    status: false,
    message: "",
  },
  bodyObj: {
    type: "inbound",
    action: "scan",
    data: {
      islocation: true,
      barcode: "SONY-001-01",
    },
  },
};

export const inBound = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOCATIONDATA:
      return {
        ...state,
        locationData: payload,
      };
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
