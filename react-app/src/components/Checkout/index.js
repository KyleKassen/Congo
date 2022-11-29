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
import plusicon from "../../media/images/plus.png";
import card from "../../media/images/stockcard.gif";
import "./checkout.css";

function Checkout() {
  const [loaded, setLoaded] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [changePayment, setChangePayment] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});
  const [defaultPayment, setDefaultPayment] = useState({});
  const [finalAddress, setFinalAddress] = useState({});
  const [finalPayment, setFinalPayment] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);
  const addressObj = useSelector((state) => state.addresses.addresses);
  const addresses = Object.values(addressObj);
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

  useEffect(() => {
    setDefaultAddress(addresses[0]);
    setFinalAddress(addresses[0]);
    setDefaultPayment(payments[0]);
    setFinalPayment(payments[0]);
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleAddressSelection = (addressId) => {
    const addressContainer = document.getElementsByClassName(
      `address-container${defaultAddress.id}`
    )[0];
    if (addressContainer) addressContainer.classList.remove("address-active");
    const newSelectedAddress = document.getElementsByClassName(
      `address-container${addressId}`
    )[0];
    newSelectedAddress.classList.add("address-active");
    setDefaultAddress(addressObj[addressId]);
  };

  const handleUseAddress = () => {
    setFinalAddress(defaultAddress);
    setChangeAddress(false);
  };

  return (
    <>
      {loaded && (
        <div className="checkout-outer-wrapper">
          <div className="checkout-header-wrapper">
            <div className="checkout-header-container">
              <img
                className="checkout-header-logo"
                src={congoWhiteTransparent}
                onClick={() => history.push("/")}
              />
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
                {!changeAddress && (
                  <div className="checkout-shipping-starter-container">
                    <div className="checkout-shipping-starter-left">
                      <h3 className="shipping-starter-index">1</h3>
                      <h3 className="shipping-starter-heading">
                        Shipping address
                      </h3>
                      <div className="checkout-shipping-starter-address-container">
                        {finalAddress && (
                          <>
                            <p>
                              {finalAddress.firstName} {finalAddress.lastName}
                            </p>
                            <p>{finalAddress.address}</p>
                            <p>
                              {finalAddress.city}, {finalAddress.state}{" "}
                              {finalAddress.zipcode}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <p
                      className="shipping-starter-change"
                      onClick={() => setChangeAddress(true)}
                    >
                      Change
                    </p>
                  </div>
                )}
                {changeAddress && (
                  <div className="checkout-shipping-change-container">
                    <div className="shipping-change-header-container">
                      <h3 className="shipping-starter-index text-color-orange">
                        1
                      </h3>
                      <h3 className="shipping-change-heading text-color-orange">
                        Choose a shipping address
                      </h3>
                      <div className="close-change-icon-container">
                        <p
                          className="shipping-change-close"
                          onClick={() => setChangeAddress(false)}
                        >
                          Close
                        </p>
                        <i onClick={() => setChangeAddress(false)}></i>
                      </div>
                    </div>
                    <div className="shipping-list-container">
                      <div className="shipping-list-header-container">
                        <h3>All shipping addresses</h3>
                        <hr />
                      </div>
                      <form>
                        {addresses.map((address, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`address-container address-container${address.id}`}
                            >
                              <input
                                type="radio"
                                id={`address${address.id}`}
                                name="address-selection"
                                onClick={() =>
                                  handleAddressSelection(address.id)
                                }
                              />
                              <label for={`address${address.id}`}>
                                <span>
                                  {address.firstName} {address.lastName}{" "}
                                </span>
                                {address.address}, {address.city},{" "}
                                {address.state}, {address.zipcode}, United
                                States{" "}
                                <Address
                                  address={address}
                                  setFinalAddress={setFinalAddress}
                                  setChangeAddress={setChangeAddress}
                                />
                              </label>
                            </div>
                          );
                        })}
                      </form>
                      <div className="add-address-container">
                        <img
                          className="address-button-span checkout-text-hover"
                          src={plusicon}
                          onClick={() => setShowAddressModal(true)}
                        />
                        <span
                          className="address-button-span checkout-text-hover"
                          onClick={() => setShowAddressModal(true)}
                        >
                          Add a new address
                        </span>
                        {showAddressModal && (
                          <Modal onClose={() => setShowAddressModal(false)}>
                            <CreateAddress
                              setShowAddressModal={setShowAddressModal}
                              setFinalAddress={setFinalAddress}
                              setChangeAddress={setChangeAddress}
                            />
                          </Modal>
                        )}
                      </div>
                    </div>
                    <div className="shipping-list-bottom-container">
                      <div
                        className="shipping-use-address yellow-checkout-button"
                        onClick={() => handleUseAddress()}
                      >
                        Use this address
                      </div>
                    </div>
                  </div>
                )}
                <hr />
              </div>
              {/* Payment section */}
              <div className="checkout-shipping-section">
                {!changePayment && (
                  <div className="checkout-shipping-starter-container">
                    <div className="checkout-shipping-starter-left">
                      <h3 className="shipping-starter-index">2</h3>
                      <h3 className="shipping-starter-heading">
                        Payment method
                      </h3>
                      <div className="checkout-shipping-starter-payment-container">
                        {finalAddress && (
                          <>
                            <p>
                              <span>Debit</span> card ending in{" "}
                              {finalPayment.cardNumber.slice(
                                finalPayment.cardNumber.length - 4,
                                finalPayment.cardNumber.length
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <p
                      className="shipping-starter-change"
                      onClick={() => setChangePayment(true)}
                    >
                      Change
                    </p>
                  </div>
                )}
                {changePayment && (
                  <div className="checkout-shipping-change-container">
                    <div className="shipping-change-header-container">
                      <h3 className="shipping-starter-index text-color-orange">
                        2
                      </h3>
                      <h3 className="shipping-change-heading text-color-orange">
                        Choose a payment method
                      </h3>
                      <div className="close-change-icon-container">
                        <p
                          className="shipping-change-close"
                          onClick={() => setChangePayment(false)}
                        >
                          Close
                        </p>
                        <i onClick={() => setChangePayment(false)}></i>
                      </div>
                    </div>
                    <div className="shipping-list-container">
                      <div className="shipping-list-header-container">
                        <h3>Your credit and debit cards</h3>
                        <div className="shipping-payment-subheader-container">
                          <p>Name on card</p>
                          <p>Expires on</p>
                        </div>
                        <hr />
                      </div>
                      <form>
                        {payments.map((payment, idx) => {
                          return (
                            <div
                              key={idx}
                              className={`payment-container payment-container${payment.id}`}
                            >
                              <label for={`address${payment.id}`}>
                                <div>
                                  <input
                                    type="radio"
                                    id={`address${payment.id}`}
                                    name="address-selection"
                                    onClick={() =>
                                      handleAddressSelection(payment.id)
                                    }
                                  />
                                  <img src={card} />
                                  <p>
                                    <span style={{ "font-weight": "bold" }}>
                                      Debit Card
                                    </span>{" "}
                                    ending in{" "}
                                    {payment.cardNumber.slice(
                                      payment.cardNumber.length - 4,
                                      payment.cardNumber.length
                                    )}
                                  </p>
                                </div>
                                <p>{payment.cardHolder}</p>
                                <p>
                                  {String(payment.cardExp).slice(2)}/20
                                  {String(payment.cardExp).slice(2, 4)}
                                </p>
                              </label>
                            </div>
                          );
                        })}
                      </form>
                      <div className="add-address-container">
                        <img
                          className="address-button-span checkout-text-hover"
                          src={plusicon}
                          onClick={() => setShowAddressModal(true)}
                        />
                        <span
                          className="address-button-span checkout-text-hover"
                          onClick={() => setShowAddressModal(true)}
                        >
                          Add a new address
                        </span>
                        {showAddressModal && (
                          <Modal onClose={() => setShowAddressModal(false)}>
                            <CreateAddress
                              setShowAddressModal={setShowAddressModal}
                              setFinalAddress={setFinalAddress}
                              setChangeAddress={setChangeAddress}
                            />
                          </Modal>
                        )}
                      </div>
                    </div>
                    <div className="shipping-list-bottom-container">
                      <div
                        className="shipping-use-address yellow-checkout-button"
                        onClick={() => handleUseAddress()}
                      >
                        Use this address
                      </div>
                    </div>
                  </div>
                )}
                <hr />
              </div>
              {/* <button onClick={() => setShowPaymentModal(true)}>
                Add Payment
              </button>
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
                })} */}
            </div>
            <div className="checkout-right-container">
              <p>Right Section</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
