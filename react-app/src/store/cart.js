const LOAD = "cart/load";
const ADD = "cart/add";

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
    await dispatch(load(cartItems));
  }

  return cartItems;
};

//##########################
// ADD Cart Items
//##########################

export const add = (cartItem) => {
    console.log("Add cart item");
    return {
      type: LOAD,
      payload: cartItem,
    };
  };

  export const addCartItem = (productId) => async (dispatch) => {
    console.log("Loading all review Thunk");
    const response = await fetch(`/api/carts/${productId}`, {
        method: "POST"
    });

    const cartItem = await response.json();

    if (response.ok) {
      await dispatch(add(cartItem));
    }

    return cartItem;
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

    case ADD:
        newState.items[action.payload.id] = action.payload;
        let addQuantity = 0;
        newState.items.forEach(item => {
            addQuantity += item.quantity
        })
        newState.totalQuantity = addQuantity;
        return newState;

    default:
      return state;
  }
};

export default cartReducer;
