const CREATE = "address/create"
const UPDATE = "address/update"
const LOAD_ALL = "address/loadAll"
const DELETE = "review/delete";

//##########################
// create address
//##########################

export const createOne = (address) => {
    console.log("creating One address");
    return {
      type: CREATE,
      payload: address,
    };
  };

  export const createOneaddress = (addressData) => async (dispatch) => {
    console.log("createing One address Thunk");
    const response = await fetch(`/api/users/addresss`, {
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
    console.log("Updating One address");
    return {
      type: UPDATE,
      payload: address,
    };
  };

  export const updateOneaddress = (address, id) => async (dispatch) => {
    console.log("Updating One address Thunk", address, id);
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
        payload: addresses
    }
}

export const loadAllAddresses = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/addresses`)

    const addresses = await response.json();

    if (response.ok) {
        dispatch(loadAll(addresses))
    }

    return addresses;
}

//##########################
// DELETE address
//##########################

export const deleteOne = (id) => {
    console.log("Deleting One address");
    return {
      type: DELETE,
      payload: id,
    };
  };

  export const deleteOneAddress = (id) => async (dispatch) => {
    console.log("Deleting One address Thunk");
    const response = await fetch(`/api/addresses/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteOne(id));
    }
    return await response.json();
  };

//##########################
// Reducer
//##########################
const initialState = { addresses: {}, default: {}}

export const addressReducer = (state = initialState, action) => {
    let newState = {
        ...state,
        addresses: { ...state.addresses},
        default: {...state.default}
    }
    switch (action.type) {
        case CREATE:
            newState.addresses[action.payload.id] = action.payload;
            return newState;
        case UPDATE:
            newState.addresses[action.payload.id] = action.payload;
            return newState;
        case LOAD_ALL:
            newState.addresses = {}
            action.payload.addresses.forEach(address => newState.addresses[address.id] = address)
            return newState;
        case DELETE:
            delete newState.addresses[action.payload];
            return newState;
        default:
            return state;
    }
}

export default addressReducer;
