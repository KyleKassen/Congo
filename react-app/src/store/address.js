const LOAD_ALL = "address/loadAll"
const DELETE = "review/delete";

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
