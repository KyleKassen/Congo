const LOAD = "cart/load";
const ADD = "cart/add";
const EDIT = "cart/edit";
const RESET = "cart/reset";

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
  console.log("Loading cart Thunk");
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
    type: ADD,
    payload: cartItem,
  };
};

export const addCartItem = (productId) => async (dispatch) => {
  console.log("Adding cart item Thunk");
  const response = await fetch(`/api/carts/${productId}`, {
    method: "POST",
  });

  const cartItem = await response.json();

  console.log(cartItem);

  if (response.ok) {
    await dispatch(add(cartItem));
  }

  return cartItem;
};

//##########################
// EDIT Cart Items
//##########################

export const edit = (cartItem) => {
  console.log("Edit cart item", cartItem);
  return {
    type: EDIT,
    payload: cartItem,
  };
};

export const editCartItem = (productId, quantity) => async (dispatch) => {
  console.log("Editing cart item Thunk");
  const response = await fetch(`/api/carts/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"quantity": quantity})
  });

  const cartItem = await response.json();

  console.log(cartItem);

  if (response.ok) {
    await dispatch(edit(cartItem));
  }

  return cartItem;
};

//##########################
// Reset Cart
//##########################

export const resetCart = () => ({type: RESET})

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
        quantity += item.quantity;
      });
      newState.totalQuantity = quantity;
      return newState;

    case ADD:
      newState.items[action.payload.id] = action.payload;
      newState.totalQuantity += 1;
      return newState;

    case EDIT:
      newState.totalQuantity += action.payload.quantity - state.items[action.payload.id].quantity
      newState.items[action.payload.id].quantity = action.payload.quantity
      return newState;

    case RESET:
        return initialState;

    default:
      return state;
  }
};

export default cartReducer;
