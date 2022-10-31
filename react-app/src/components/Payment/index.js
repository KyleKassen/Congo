import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditPayment from "../Forms/Payment/editPayment";
import { deleteOnePayment } from "../../store/payment";
import { Modal } from "../../context/Modal";

function Payment({ payment }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const deletePayment = async () => {
    await dispatch(deleteOnePayment(payment.id));
    // return null;
  };

  return (
    <>
      <p>{payment.cardNumber}</p>
      <p>{payment.cardHolder}</p>
      <p>{payment.cardExp}</p>
      <p>{payment.securityCode}</p>
      <button onClick={() => deletePayment(payment.id)}>delete</button>
      <button onClick={() => setShowModal(true)}>update</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPayment setShowModal={setShowModal} paymentId={payment.id} />
        </Modal>
      )}
    </>
  );
}

export default Payment;
