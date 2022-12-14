const LOAD = "product/load";
const ADD = "product/add";
const UPDATE = "product/update";
const DELETE = "product/delete";
const LOAD_ALL = "product/loadAll";

//##########################
// LOAD ONE PRODUCT
//##########################

export const loadOne = (product) => {

  return {
    type: LOAD,
    payload: product,
  };
};

export const loadOneProduct = (id) => async (dispatch) => {

  const response = await fetch(`/api/products/${id}`);

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

  return {
    type: ADD,
    payload: product,
  };
};

export const addOneProduct = (newProduct) => async (dispatch) => {

  const response = await fetch(`/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
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

  return {
    type: UPDATE,
    payload: product,
  };
};

export const updateOneProduct = (oldProduct, id) => async (dispatch) => {

  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oldProduct),
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

  return {
    type: DELETE,
    payload: id,
  };
};

export const deleteOneProduct = (id) => async (dispatch) => {

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

  return {
    type: LOAD_ALL,
    payload: products,
  };
};

export const loadAllProducts = () => async (dispatch) => {

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
      newState.singleProduct = action.payload;
      return newState;
    case DELETE:
      delete newState.allProducts[action.payload.id];
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
