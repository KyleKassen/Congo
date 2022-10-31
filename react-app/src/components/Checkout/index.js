import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAddresses } from "../../store/address";
import { Modal } from "../../context/Modal";
import CreateAddress from "../Forms/Address/createAddress";
import Address from "../Address";
import Payment from "../Payment";

function Checkout() {
  const [loaded, setLoaded] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const addresses = useSelector((state) =>
    Object.values(state.addresses.addresses)
  );
  const payments = useSelector((state) => Object.values(state.payments.payments))

  useEffect(() => {
    (async () => {
      await dispatch(loadAllAddresses(userId));
      await dispatch(loadAllPayments(userId))
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
        <button onClick={() => setShowAddressModal(true)}>Add Address</button>
      {showAddressModal && (
        <Modal onClose={() => setShowAddressModal(false)}>
          <CreateAddress setShowAddressModal={setShowAddressModal} />
        </Modal>
      )}
      {addresses &&
        addresses.map((address, idx) => {
          return (
            <div key={idx}>
              <Address address={address} />
            </div>
          );
        })}
        <button onClick={() => setShowPaymentModal(true)}>Add Payment</button>
      {showPaymentModal && (
        <Modal onClose={() => setShowPaymentModal(false)}>
          <CreatePayment setShowPaymentModal={setShowPaymentModal} />
        </Modal>
      )}
      {payments &&
        payments.map((payment, idx) => {
          return (
            <div key={idx}>
              <Payment payment={payment} />
            </div>
          );
        })}
    </>
  );
}

export default Checkout;
