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
  const paymentObj = useSelector((state) => state.payments.payments);
  const addresses = Object.values(addressObj);
  const payments = useSelector((state) =>
    Object.values(state.payments.payments)
  );
  const cart = useSelector((state) => state.cart);
  const cartItems = Object.values(cart.items);

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

  const handlePaymentSelection = (paymentId) => {
    const paymentContainer = document.getElementsByClassName(
      `payment-container${defaultPayment.id}`
    )[0];
    if (paymentContainer) paymentContainer.classList.remove("payment-active");
    const newSelectedPayment = document.getElementsByClassName(
      `payment-container${paymentId}`
    )[0];
    newSelectedPayment.classList.add("payment-active");
    setDefaultPayment(paymentObj[paymentId]);
  };

  const handleUseAddress = () => {
    setFinalAddress(defaultAddress);
    setChangeAddress(false);
  };

  const handleUsePayment = () => {
    setFinalPayment(defaultPayment);
    setChangePayment(false);
  };

  // -----------------------------------------------------------------
  // Dealing with delivery times and such vvvvvvvvvvvvvvvvvvvvvvvvvvvv
  let objToday = new Date();
  let objTodayThree = new Date();
  let objTodayFour = new Date();
  let objTodayNine = new Date();
  objTodayThree.setDate(objTodayThree.getDate() + 3);
  objTodayFour.setDate(objTodayFour.getDate() + 4);
  objTodayNine.setDate(objTodayNine.getDate() + 9);

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const todayDay = objToday.getDate();
  const todayWeekDay = days[objToday.getDay()];
  const todayMonth = months[objToday.getMonth()];
  const todayYear = objToday.getFullYear();
  const weekDayThree = days[objTodayThree.getDay()];
  const monthThree = months[objTodayThree.getMonth()];
  const dayThree = objTodayThree.getDate();
  const weekDayFour = days[objTodayFour.getDay()];
  const monthFour = months[objTodayFour.getMonth()];
  const dayFour = objTodayFour.getDate();
  const weekDayNine = days[objTodayNine.getDay()];
  const monthNine = months[objTodayNine.getMonth()];
  const dayNine = objTodayNine.getDate();
  // Dealing with delivery times and such ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // Countdown timer for shipping vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  let start = new Date();
  start.setHours(24, 0, 0); // 12pm
  if (loaded) tick();

  function pad(num) {
    return ("0" + parseInt(num)).substr(-2);
  }

  function tick() {
    let now = new Date();
    if (now > start) {
      // too late, go to tomorrow
      start.setDate(start.getDate() + 1);
    }
    let remain = (start - now) / 1000;
    let hh = pad((remain / 60 / 60) % 60);
    let mm = pad((remain / 60) % 60);
    let ss = pad(remain % 60);
    const timeEle = document.getElementsByClassName("time");
    if (timeEle) {
      for (let i = 0; i < Object.values(timeEle).length; i++)
        timeEle[i].innerHTML = hh + " hours and " + mm + " minute";
    }
    setTimeout(tick, 60000);
  }
  // Countdown timer for shipping ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------


  // -----------------------------------------------------------------
  // Handle shipping time change vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  const handleShippingChange = (idx) => {

  }
  // Handle shipping time change ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------

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
                        {finalPayment && (
                          <>
                            <p>
                              {console.log(finalPayment)}
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
                          payment.cardExp =
                            String(payment.cardExp).length == 3
                              ? `0${String(payment.cardExp)}`
                              : String(payment.cardExp);
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
                                      handlePaymentSelection(payment.id)
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
                                  {payment.cardExp.slice(0, 2)}/20
                                  {payment.cardExp.slice(2, 4)}
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
                          onClick={() => setShowPaymentModal(true)}
                        />
                        <span
                          className="address-button-span checkout-text-hover"
                          onClick={() => setShowPaymentModal(true)}
                        >
                          Add a debit card
                        </span>
                        {showPaymentModal && (
                          <Modal onClose={() => setShowPaymentModal(false)}>
                            <CreatePayment
                              setShowPaymentModal={setShowPaymentModal}
                              setFinalPayment={setFinalPayment}
                              setChangePayment={setChangePayment}
                            />
                          </Modal>
                        )}
                      </div>
                    </div>
                    <div className="shipping-list-bottom-container">
                      <div
                        className="shipping-use-address yellow-checkout-button"
                        onClick={() => handleUsePayment()}
                      >
                        Use this payment method
                      </div>
                    </div>
                  </div>
                )}
                <hr />
              </div>
              {/*Review items and shipping section */}
              <div className="checkout-items-section">
                <div className="items-header-container">
                  <div className="checkout-shipping-starter-left">
                    <h3 className="items-index">3</h3>
                    <h3 className="items-heading">Review items and shipping</h3>
                  </div>
                  <div className="items-outer-container">
                    {cartItems.map((item, idx) => {
                      return (
                        <div key={idx} className="item-outer-container">
                          <div className="item-delivery-container">
                            <p>
                              <span className="item-delivery-span bold-green-text">
                                Delivery: {monthThree} {dayThree}, 2022
                              </span>
                              If you order in the next{" "}
                              <span className="time"></span>
                            </p>
                            <p>Items shipped from Congo.com</p>
                          </div>
                          <div className="item-bottom-container">
                            <div className="item-left-container">
                              <img src={`${item.product.image.url}`} />
                              <div className="item-info-container">
                                <p>{item.product.title}</p>
                                <div className="item-info-pp-container">
                                  <p className="item-info-price">
                                    ${item.product.price}
                                  </p>
                                  <i></i>
                                </div>
                                <p>Sold by: <span>Congo</span></p>
                              </div>
                            </div>
                            <div className="item-right-container">
                              <p>Choose your Prime deliery option:</p>
                              <div className="item-shipping-radio-container">
                              <input type="radio" defaultChecked={true} id={`fast-shipping-${idx}`} name={`shipping-input-${idx}`}/>
                              <label for={`fast-shipping-${idx}`}>
                                <p className="bold-green-text">{weekDayThree}, {monthThree} {dayThree}</p>
                                <p>FREE <span>Prime Delivery</span></p>
                              </label>
                              </div>
                              <div className="item-shipping-radio-container">
                              <input type="radio" id={`mid-shipping-${idx}`} name={`shipping-input-${idx}`}/>
                              <label for={`mid-shipping-${idx}`}>
                                <p className="bold-green-text">{weekDayFour}, {monthFour} {dayFour}</p>
                                <p>FREE <span>Congo Day Delivery</span></p>
                                <p>Arrive a day later.</p>
                              </label>
                              </div>
                              <div className="item-shipping-radio-container">
                              <input type="radio" id={`slow-shipping-${idx}`} name={`shipping-input-${idx}`}/>
                              <label for={`slow-shipping-${idx}`}>
                                <p className="bold-green-text">{weekDayNine}, {monthNine} {dayNine}</p>
                                <p>FREE <span>No-Rush Shipping</span></p>
                                <p>Get a $4 reward for select digital purchases. One reward per purchase.</p>
                              </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
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
