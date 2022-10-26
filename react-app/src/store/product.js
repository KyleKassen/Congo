const LOAD = "product/load";
const ADD = "product/add";
const UPDATE = "product/update";
const DELETE = "product/delete";
const LOAD_ALL = "product/loadAll";

//##########################
// LOAD ONE PRODUCT
//##########################

export const loadOne = (product) => {
  console.log("Loading One Product");
  return {
    type: LOAD,
    payload: product,
  };
};

export const loadOneProduct = (id) => async (dispatch) => {
  console.log("Loading One Product Thunk");
  const response = await fetch(`/api/products/${id}/`);

  const product = await response.json();
  if (response.ok) {
    dispatch(loadOne(product));
  }
  return product;
};

//##########################
// ADD PRODUCT
//##########################

export const addOne = (product) => {
  console.log("Adding One Product");
  return {
    type: ADD,
    payload: product,
  };
};

export const addOneProduct = (product) => async (dispatch) => {
  console.log("Adding One Product Thunk");
  const response = await fetch(`/api/reviews/`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const product = await response.json();

  if (response.ok) {
    dispatch(addOne(product));
  }
  return product;
};

//##########################
// UPDATE PRODUCT
//##########################

export const updateOne = (product) => {
  console.log("Updating One Product");
  return {
    type: UPDATE,
    payload: product,
  };
};

export const updateOneProduct = (product, id) => async (dispatch) => {
  console.log("Updating One Product Thunk");
  const response = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const product = await response.json();

  if (response.ok) {
    dispatch(updateOne(product));
  }
  return product;
};

//##########################
// DELETE PRODUCT
//##########################

export const deleteOne = (id) => {
  console.log("Deleting One Product");
  return {
    type: DELETE,
    payload: id,
  };
};

export const deleteOneProduct = (id) => async (dispatch) => {
  console.log("Deleting One Product Thunk");
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteOne(id));
  }
  return await response.json();
};

//##########################
// LOAD ALL PRODUCTS
//##########################

export const loadAll = (products) => {
  console.log("Loading all Product");
  return {
    type: LOAD_ALL,
    payload: products,
  };
};

export const loadAllProducts = () => async (dispatch) => {
  console.log("Loading all Product Thunk");
  const response = await fetch(`/api/products/`);

  const products = await response.json();

  if (response.ok) {
    dispatch(loadAll(products));
  }

  return products;
};

//##########################
// Reducer
//##########################
const initialState = { allProducts: {}, singleProduct: {} };

export const productReducer = (state = initialState, action) => {
  let newState = {
    ...state,
    allProducts: { ...state.allProducts },
    singleProduct: { ...state.singleProduct },
  };
  switch (action.type) {
    case LOAD:
      newState.singleProduct = action.payload;
      return newState;
    case ADD:
      newState.singleProduct = action.payload;
      return newState;
    case UPDATE:
      newState.singleProduct = action.paylaod;
      return newState;
    case DELETE:
      delete newState.allProducts[action.payload];
      return newState;
    case LOAD_ALL:
        newState.allProducts = {}
        action.payload.products.forEach(product => newState.allProducts[product.id] = product)
        return newState

    default:
      return state;
  }
};

export default productReducer;
