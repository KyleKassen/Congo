const CREATE = "address/create";
const UPDATE = "address/update";
const LOAD_ALL = "address/loadAll";
const DELETE = "address/delete";
const DEFAULT = "address/default";
const RESET = "address/reset";

//##########################
// create address
//##########################

export const createOne = (address) => {
  return {
    type: CREATE,
    payload: address,
  };
};

export const createOneAddress = (addressData) => async (dispatch) => {
  const response = await fetch(`/api/users/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addressData),
  });

  const address = await response.json();

  if (response.ok) {
    dispatch(createOne(address));
  }
  return address;
};

//##########################
// UPDATE address
//##########################

export const updateOne = (address) => {
  return {
    type: UPDATE,
    payload: address,
  };
};

export const updateOneAddress = (address, id) => async (dispatch) => {
  const response = await fetch(`/api/users/addresses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });

  const newAddress = await response.json();

  if (response.ok) {
    dispatch(updateOne(newAddress));
  }
  return newAddress;
};

//##########################
// LOAD ALL user Addresses
//##########################

export const loadAll = (addresses) => {
  return {
    type: LOAD_ALL,
    payload: addresses,
  };
};

export const loadAllAddresses = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/addresses`);

  const addresses = await response.json();

  if (response.ok) {
    dispatch(loadAll(addresses));
  }

  return addresses;
};

//##########################
// DELETE address
//##########################

export const deleteOne = (id) => {

  return {
    type: DELETE,
    payload: id,
  };
};

export const deleteOneAddress = (id) => async (dispatch) => {

  const response = await fetch(`/api/users/addresses/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteOne(id));
  }
  return await response.json();
};

//##########################
// DEFAULT address
//##########################

export const editDefault = (id) => {

  return {
    type: DEFAULT,
    payload: id,
  };
};

export const editDefaultAddress = (id) => async (dispatch) => {

  const response = await fetch(`/api/users/addresses/default/${id}`, {
    method: "PUT",
  });

  if (response.ok) {
    dispatch(editDefault(id));
  }
  return await response.json();
};

//##########################
// RESET address
//##########################

export const resetAddress = () => {

  return {
    type: RESET
  };
};

//##########################
// Reducer
//##########################
const initialState = { addresses: {}, default: {} };

export const addressReducer = (state = initialState, action) => {
  let newState = {
    ...state,
    addresses: { ...state.addresses },
    default: { ...state.default },
  };
  switch (action.type) {
    case CREATE:
      if (newState.default.id) newState.addresses[newState.default.id].defaultAddress = false
      newState.addresses[action.payload.id] = action.payload;
      newState.default = action.payload
      return newState;
    case UPDATE:
      newState.addresses[action.payload.id] = action.payload;
      return newState;
    case LOAD_ALL:
      newState.addresses = {};
      action.payload.addresses.forEach(
        (address) => {
          (newState.addresses[address.id] = address)
          if (address.defaultAddress) newState.default = address
        }
      );
      return newState;
    case DELETE:
      delete newState.addresses[action.payload];
      if (newState.default.id == action.payload) newState.default = {}
      return newState;
    case DEFAULT:
      if (newState.default.id) newState.addresses[newState.default.id].defaultAddress = false
      newState.addresses[action.payload].defaultAddress = true;
      newState.default = newState.addresses[action.payload];
      return newState;
    case RESET:
      newState.addresses = {}
      newState.default = {}
      return newState;
    default:
      return state;
  }
};

export default addressReducer;
