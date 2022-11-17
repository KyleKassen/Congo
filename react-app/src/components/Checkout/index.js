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
  const [defaultAddress, setDefaultAddress] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

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
      setDefaultAddress(addresses[0]);
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
            Checkout{" "}
            <span className="checkout-heading-outer-span">
              (
              <span
                className="checkout-heading-inner-span"
                onClick={() => history.push("/cart")}
              >
                {cart.totalQuantity} items
              </span>
              )
            </span>
          </h1>
          <div className="header-lock-container">
            <img className="checkout-header-lock" src={lock} />
          </div>
        </div>
      </div>
      <div className="checkout-outer-container">
        <div className="checkout-left-container">
          <div className="checkout-shipping-section">
            <div className="checkout-shipping-starter-container">
              <h3>1</h3>
              <h3>Shipping address</h3>
              <div className="checkout-shipping-starter-address-container">
                <p></p>
                <p></p>
                <p></p>
              </div>
              <p>Change</p>
            </div>
            <button onClick={() => setShowAddressModal(true)}>
              Add Address
            </button>
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
          </div>
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
        <div className="checkout-right-container"></div>
      </div>
    </div>
  );
}

export default Checkout;
