import { API_URL } from "../../config";

export const SET_REQUESTS = "inbound/dockin/SET_REQUESTS";
export const SET_PARTDATA = "inbound/dockin/SET_PARTDATA";
export const SET_LOCATIONDATA = "inbound/dockin/SET_LOCATIONDATA";
export const SET_BODYOBJ = "inbound/dockin/SET_BODYOBJ";

export const setLocationData = (data) => ({
  type: SET_LOCATIONDATA,
  payload: data,
});
export const setPartData = (data) => ({
  type: SET_PARTDATA,
  payload: data,
});

export const setBodyObj = (body) => ({
  type: SET_BODYOBJ,
  payload: body,
});

export const setRequests = async (dispatch, data) => {
  let message = "Added successfully";
  dispatch({
    type: SET_REQUESTS,
    payload: data,
  });

  return message;
};

export const checkBarcode = async (dispatch, body, state) => {
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
        dispatch(setPartData([]));
        let newObj = {
          ...state.bodyObj,
          data: {
            ...state.bodyObj.data,
            islocation: false,
          },
        };
        dispatch(setBodyObj(newObj));
      } else {
        dispatch(setPartData(data.data));
      }
    } else {
      console.log(error);
    }
  } catch (err) {
    console.log(`Something went wrong with ${err}`);
  }
  return true;
};
