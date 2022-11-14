const LOAD = "cart/load";

//##########################
// LOAD Cart Items
//##########################

export const load = (cartItems) => {
  console.log("Loading all products in cart");
  return {
    type: LOAD,
    payload: cartItems,
  };
};

export const loadCartItems = (userId) => async (dispatch) => {
  console.log("Loading all review Thunk");
  const response = await fetch(`/api/carts/${userId}`);

  const cartItems = await response.json();

  if (response.ok) {
    dispatch(load(cartItems));
  }

  return cartItems;
};


//##########################
// Reducer
//##########################
const initialState = { items: {} };

export const cartReducer = (state = initialState, action) => {
    let newState = {
        ...state,
        items: { ...state.items }
    };

    switch (action.type) {
        case LOAD:
            newState.items = {};
            action.payload.cartItems.forEach(item => newState.items[item.id] = item)
            return newState;

        default:
            return state;
    }
}

export default cartReducer;
