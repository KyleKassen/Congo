const LOAD_ALL = "address/loadAll"

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
        default:
            return state;
    }
}

export default addressReducer;
