const LOAD = "review/load";
const ADD = "review/add";
const UPDATE = "review/update";
const DELETE = "review/delete";
const LOAD_ALL = "review/loadAll";

//##########################
// LOAD ONE review
//##########################

export const loadOne = (review) => {
  console.log("Loading One review");
  return {
    type: LOAD,
    payload: review,
  };
};

export const loadOneReview = (id) => async (dispatch) => {
  console.log("Loading One review Thunk");
  const response = await fetch(`/api/reviews/${id}`);

  const review = await response.json();
  if (response.ok) {
    dispatch(loadOne(review));
  }
  return review;
};

//##########################
// ADD review
//##########################

export const addOne = (review) => {
  console.log("Adding One review");
  return {
    type: ADD,
    payload: review,
  };
};

export const addOneReview = (review) => async (dispatch) => {
  console.log("Adding One review Thunk");
  const response = await fetch(`/api/reviews`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  const review = await response.json();

  if (response.ok) {
    dispatch(addOne(review));
  }
  return review;
};

//##########################
// UPDATE review
//##########################

export const updateOne = (review) => {
  console.log("Updating One review");
  return {
    type: UPDATE,
    payload: review,
  };
};

export const updateOneReview = (review, id) => async (dispatch) => {
  console.log("Updating One review Thunk");
  const response = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  const review = await response.json();

  if (response.ok) {
    dispatch(updateOne(review));
  }
  return review;
};

//##########################
// DELETE review
//##########################

export const deleteOne = (id) => {
  console.log("Deleting One review");
  return {
    type: DELETE,
    payload: id,
  };
};

export const deleteOneReview = (id) => async (dispatch) => {
  console.log("Deleting One review Thunk");
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteOne(id));
  }
  return await response.json();
};

//##########################
// LOAD ALL reviews for a Product
//##########################

export const loadAll = (reviews) => {
  console.log("Loading all review");
  return {
    type: LOAD_ALL,
    payload: reviews,
  };
};

export const loadAllReviews = (productId) => async (dispatch) => {
  console.log("Loading all review Thunk");
  const response = await fetch(`/api/products/${productId}/reviews`);

  const reviews = await response.json();

  if (response.ok) {
    dispatch(loadAll(reviews));
  }

  return reviews;
};

//##########################
// Reducer
//##########################
const initialState = { productReviews: {} };

export const reviewReducer = (state = initialState, action) => {
  let newState = {
    ...state,
    productReviews: { ...state.productReviews }
  };
  switch (action.type) {
    // case LOAD:
    //   newState.singlereview = action.payload;
    //   return newState;
    // case ADD:
    //   newState.singlereview = action.payload;
    //   return newState;
    // case UPDATE:
    //   newState.singlereview = action.paylaod;
    //   return newState;
    // case DELETE:
    //   delete newState.allreviews[action.payload];
    //   return newState;
    case LOAD_ALL:
        newState.productReviews = {}
        action.payload.reviews.forEach(review => newState.productReviews[review.id] = review)
        return newState

    default:
      return state;
  }
};

export default reviewReducer;
