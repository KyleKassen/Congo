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
const initialState = { items: {}, totalQuantity: 0 };

export const cartReducer = (state = initialState, action) => {
  let newState = {
    ...state,
    items: { ...state.items },
    totalQuantity: state.totalQuantity,
  };

  switch (action.type) {
    case LOAD:
      newState.items = {};
      let quantity = 0;
      action.payload.cartItems.forEach((item) => {
        newState.items[item.id] = item;
        quantity += item.quantity
      });
      newState.totalQuantity = quantity;
      return newState;

    default:
      return state;
  }
};

export default cartReducer;
