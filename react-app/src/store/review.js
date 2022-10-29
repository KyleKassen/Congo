// const LOAD = "review/load";
const CREATE = "review/create";
const UPDATE = "review/update";
const DELETE = "review/delete";
const LOAD_ALL = "review/loadAll";

//##########################
// LOAD ONE review
//##########################

// export const loadOne = (review) => {
//   console.log("Loading One review");
//   return {
//     type: LOAD,
//     payload: review,
//   };
// };

// export const loadOneReview = (id) => async (dispatch) => {
//   console.log("Loading One review Thunk");
//   const response = await fetch(`/api/reviews/${id}`);

//   const review = await response.json();
//   if (response.ok) {
//     dispatch(loadOne(review));
//   }
//   return review;
// };

//##########################
// create review
//##########################

export const createOne = (review) => {
  console.log("createing One review");
  return {
    type: CREATE,
    payload: review,
  };
};

export const createOneReview = (reviewData, productId) => async (dispatch) => {
  console.log("createing One review Thunk");
  const response = await fetch(`/api/products/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const review = await response.json();

  if (response.ok) {
    dispatch(createOne(review));
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
  console.log("Updating One review Thunk", review, id);
  const response = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  const newReview = await response.json();

  if (response.ok) {
    dispatch(updateOne(newReview));
  }
  return newReview;
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
    case CREATE:
      newState.productReviews[action.payload.id] = action.payload;
      return newState;
    case UPDATE:
      const reviewId = action.payload.id
      newState.productReviews[reviewId] = {...action.payload, images:[...state.productReviews[reviewId].images]};
      return newState;
    case DELETE:
      delete newState.productReviews[action.payload];
      return newState;
    case LOAD_ALL:
        newState.productReviews = {}
        action.payload.reviews.forEach(review => newState.productReviews[review.id] = review)
        return newState

    default:
      return state;
  }
};

export default reviewReducer;
