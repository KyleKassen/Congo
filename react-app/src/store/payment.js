const CREATE = "payment/create"
const UPDATE = "payment/update"
const LOAD_ALL = "payment/loadAll"
const DELETE = "payment/delete";
const RESET = "payment/reset";

//##########################
// create payment
//##########################

export const createOne = (payment) => {
    console.log("creating One payment");
    return {
      type: CREATE,
      payload: payment,
    };
  };

export const createOnepayment = (paymentData) => async (dispatch) => {
    console.log("creating One payment Thunk");
    const response = await fetch(`/api/users/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const payment = await response.json();

    if (response.ok) {
      dispatch(createOne(payment));
    }
    return payment;
  };

//##########################
// UPDATE payment
//##########################

export const updateOne = (payment) => {
    console.log("Updating One payment");
    return {
      type: UPDATE,
      payload: payment,
    };
  };

  export const updateOnePayment = (payment, id) => async (dispatch) => {
    console.log("Updating One payment Thunk", payment, id);
    const response = await fetch(`/api/users/payments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    });

    const newPayment = await response.json();

    if (response.ok) {
      dispatch(updateOne(newPayment));
    }
    return newPayment;
  };

//##########################
// LOAD ALL user paymentes
//##########################

export const loadAll = (payments) => {
    return {
        type: LOAD_ALL,
        payload: payments
    }
}

export const loadAllPayments = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/payments`)

    const payments = await response.json();

    if (response.ok) {
        dispatch(loadAll(payments))
    }

    return payments;
}

//##########################
// DELETE payment
//##########################

export const deleteOne = (id) => {
    console.log("Deleting One payment");
    return {
      type: DELETE,
      payload: id,
    };
  };

  export const deleteOnePayment = (id) => async (dispatch) => {
    console.log("Deleting One payment Thunk");
    const response = await fetch(`/api/users/payments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteOne(id));
    }
    return await response.json();
  };


//##########################
// RESET payment
//##########################

export const resetPayment = () => {
  console.log("RESETing payments");
  return {
    type: RESET
  };
};


//##########################
// Reducer
//##########################
const initialState = { payments: {}, default: {}}

export const paymentReducer = (state = initialState, action) => {
    let newState = {
        ...state,
        payments: { ...state.payments},
        default: {...state.default}
    }
    switch (action.type) {
        case CREATE:
            newState.payments[action.payload.id] = action.payload;
            return newState;
        case UPDATE:
            newState.payments[action.payload.id] = action.payload;
            return newState;
        case LOAD_ALL:
            newState.payments = {}
            action.payload.payments.forEach(payment => newState.payments[payment.id] = payment)
            return newState;
        case DELETE:
            delete newState.payments[action.payload];
            return newState;
        case RESET:
          newState.payments = {}
          newState.default = {}
          return newState
        default:
            return state;
    }
}

export default paymentReducer;
