import { API_URL } from "../../config";

export const SET_REQUESTS = "inbound/dockin/SET_REQUESTS";
export const SET_PARTDATA = "inbound/dockin/SET_PARTDATA";
export const SET_LOCATIONDATA = "inbound/dockin/SET_LOCATIONDATA";
export const SET_BODYOBJ = "inbound/dockin/SET_BODYOBJ";
export const SET_ERROR = "inbound/dockin/SET_ERROR";
export const SET_PART_BARCODE = "inbound/dockin/SET_PART_BARCODE";

export const setLocationData = (data) => ({
  type: SET_LOCATIONDATA,
  payload: data,
});
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

export const setRequests = async (dispatch, data) => {
  let message = "Added successfully";
  dispatch({
    type: SET_REQUESTS,
    payload: data,
  });

  return message;
};

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
      if (data.data.location !== "") {
        dispatch(setLocationData(data.data));
        dispatch(setError({ status: false, message: "" }));
        dispatch(setPartData([]));
        dispatch(setPartBarcode(null));
        let newObj = {
          ...state.bodyObj,
          data: {
            ...state.bodyObj.data,
            islocation: false,
          },
        };
        dispatch(setBodyObj(newObj));
      } else {
        if (state.locationData.location !== undefined) {
          dispatch(setPartData(data.data));
          dispatch(setPartBarcode(barcode));
          dispatch(setError({ status: false, message: "" }));
        } else {
          dispatch(
            setError({ status: true, message: "Please Enter Location First!" })
          );
          dispatch(setPartBarcode(null));
        }
      }
    } else {
      dispatch(setError({ status: true, message: data.data }));
    }
  } catch (err) {
    console.log(`Something went wrong with ${err}`);
  }
  return true;
};

export const handleInsert = async (dispatch, data, state) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let bodyValue = {
    type: "inbound",
    action: "insert",
    data: {
      locationkey: state.locationData.locationkey,
      locationname: state.locationData.location,
      parttype: state.partData.parttype,
      partnumber: state.partData.partnumber,
      barcode: state.partBarcode,
      quantity: data.quantity,
      documentnumber: data.documentnumber,
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
      islocation: false,
    },
  };
  // dispatch(setLocationData([]));
  dispatch(setPartData([]));
  dispatch(setPartBarcode(null));
  dispatch(setBodyObj(newObj));
};
