import { API_URL } from "../../config";

export const SET_REQUESTS = "outbound/picking/SET_REQUESTS";
export const SET_PARTDATA = "outbound/picking/SET_PARTDATA";
export const SET_BODYOBJ = "outbound/picking/SET_BODYOBJ";
export const SET_ERROR = "outbound/picking/SET_ERROR";
export const SET_PART_BARCODE = "outbound/picking/SET_PART_BARCODE";

export const setPartData = (data) => ({
  type: SET_PARTDATA,
  payload: data,
});
export const setError = (data) => ({
  type: SET_ERROR,
  payload: data,
});

export const setBodyObj = (body) => ({
  type: SET_BODYOBJ,
  payload: body,
});
export const setPartBarcode = (data) => ({
  type: SET_PART_BARCODE,
  payload: data,
});

export const checkBarcode = async (dispatch, body, state, barcode) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const bodyOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch(API_URL, bodyOptions);
    const data = await res.json();
    console.log(data);
    if (data.statuscode === 200) {
      dispatch(setPartData(data.data[0]));
      dispatch(setPartBarcode(barcode));
      dispatch(
        setError({
          status: false,
          message: "",
        })
      );
    } else {
      dispatch(
        setError({
          status: true,
          message: data.message,
        })
      );
      dispatch(setPartData([]));
    }
  } catch (err) {
    console.log(`Something went wrong with`);
  }
  return true;
};

export const handleInsert = async (dispatch, data, state) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let bodyValue = {
    type: "outbound",
    action: "insert",
    data: {
      requestkey: state.partData.requestkey,
      locationkey: data.locationkey,
      quantity: data.quantity,
      barcode: state.partBarcode,
    },
  };
  const bodyOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(bodyValue),
  };

  try {
    const res = await fetch(API_URL, bodyOptions);
    const data = await res.json();
    if (data.statuscode === 200) {
      return { message: data.message };
    } else {
      return { message: data.message };
    }
  } catch (error) {
    dispatch(
      setError({
        status: true,
        message: "Something Went Wrong,Please try Again",
      })
    );
  }
};

export const stateReset = async (dispatch, state) => {
  let newObj = {
    ...state.bodyObj,
    data: {
      ...state.bodyObj.data,
      data: "",
    },
  };
  // dispatch(setLocationData([]));
  dispatch(setPartData([]));
  dispatch(setPartBarcode(null));
  dispatch(setBodyObj(newObj));
};
