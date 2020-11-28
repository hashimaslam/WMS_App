export const SET_REQUESTS = "inbound/dockin/SET_REQUESTS";

export const setRequests = async (dispatch, data) => {
  let message = "Added successfully";
  dispatch({
    type: SET_REQUESTS,
    payload: data,
  });

  return message;
};
