import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAddresses } from "../../store/address";
import { loadAllPayments } from "../../store/payment";
import { loadCartItems } from "../../store/cart";
import { Modal } from "../../context/Modal";
import CreateAddress from "../Forms/Address/createAddress";
import CreatePayment from "../Forms/Payment/createPayment";
import Address from "../Address";
import Payment from "../Payment";
import congoWhite from "../../media/images/CONGOwhite.png";
import congoWhiteTransparent from "../../media/images/CONGOwhite-transparent.png";
import lock from "../../media/images/greyLock.png";
import "./checkout.css";

function Checkout() {
  const [loaded, setLoaded] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const addresses = useSelector((state) =>
    Object.values(state.addresses.addresses)
  );
  const payments = useSelector((state) =>
    Object.values(state.payments.payments)
  );
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllAddresses(userId));
      await dispatch(loadAllPayments(userId));
      await dispatch(loadCartItems(userId));
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="checkout-outer-wrapper">
      <div className="checkout-header-wrapper">
        <div className="checkout-header-container">
          <img className="checkout-header-logo" src={congoWhiteTransparent} />
          <h1>
            Checkout (<span>{cart.totalQuantity} items</span>)
          </h1>
          <img className="checkout-header-lock" src={lock} />
        </div>
      </div>
      <div className="checkout-outer-container">
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
      </div>
    </div>
  );
}

export default Checkout;
