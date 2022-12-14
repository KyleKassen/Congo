import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAddresses, editDefaultAddress } from "../../store/address";
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
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [deliverySetting, setDeliverySetting] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const {productId} = useParams();

  const userId = useSelector((state) => state.session.user.id);
  const addressObj = useSelector((state) => state.addresses.addresses);
  const defaultAddressObj = useSelector(state => state.addresses.default);
  const paymentObj = useSelector((state) => state.payments.payments);
  const addresses = Object.values(addressObj);
  const payments = useSelector((state) =>
    Object.values(state.payments.payments)
  );
  const cart = useSelector((state) => state.cart);
  // let cartItems;
  let allCartItems = Object.values(cart.items);
  let buyNowProduct;
  buyNowProduct = useSelector(state => state.products.allProducts[productId])

  useEffect(() => {
    (async () => {
      console.log('productId is', productId)
      await dispatch(loadAllAddresses(userId));
      await dispatch(loadAllPayments(userId));
      await dispatch(loadCartItems(userId));
      if (productId) {
        const productCopy = {...buyNowProduct, image: {...buyNowProduct.images[0]}}
        setCartItems([{id: 1, product: {...productCopy}, quantity: 1}])
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  console.log(`product id is ${productId}`)

  useEffect(() => {
    setDefaultAddress(addresses[0]);
    setFinalAddress(addresses[0]);
    setDefaultPayment(payments[0]);
    setFinalPayment(payments[0]);
    if (!productId) {
      setCartItems([...allCartItems])
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleAddressSelection = async (addressId) => {
    const activeAddress = document.getElementsByClassName("address-active")[0];
    if (activeAddress) activeAddress.classList.remove("address-active");
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
    const activePayment = document.getElementsByClassName("payment-active")[0];
    if (activePayment) activePayment.classList.remove("payment-active");
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

  const handleUseAddress = async () => {
    setFinalAddress(defaultAddress);
    await dispatch(editDefaultAddress(defaultAddress.id))
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
  // let deliverySetting = {};

  const handleShippingChange = (button, idx) => {
    let newObj = deliverySetting;
    deliverySetting[idx] = button;
    setDeliverySetting(newObj);
    const deliveryTime = document.getElementsByClassName(
      `item-delivery-${idx}`
    )[0];
    if (button == 3) {
      deliveryTime.innerHTML = `Delivery: ${monthThree} ${dayThree}, ${todayYear}`;
      deliveryTime.style.color = "#007600";
    } else if (button == 4) {
      deliveryTime.innerHTML = `Delivery: ${monthFour} ${dayFour}, ${todayYear}`;
      deliveryTime.style.color = "#007600";
    } else if (button == 9) {
      deliveryTime.innerHTML = `Estimated delivery: ${monthNine} ${dayNine}, ${todayYear}`;
      deliveryTime.style.color = "#c45500";
    }
    // Calculate the total discount
    setDiscount(
      Object.values(deliverySetting).filter((x) => x === 9).length * 4
    );
    console.log(
      Object.values(deliverySetting),
      Object.values(deliverySetting).filter((x) => x === 9).length * 4
    );
  };
  // Handle shipping time change ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // Turn number into cash format vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  const numToCash = (num) => {
    let totalStr = String(Math.round(num * 100) / 100);
    const totalStrArr = totalStr.split(".");
    totalStr = totalStrArr[1].length == 1 ? `${totalStr}0` : totalStr;
    return totalStr;
  };
  // Turn number into cash format ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------

  let total = 0;
  return (
    <>
      {loaded && cartItems.length > 0 && (
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
                        {defaultAddressObj && (
                          <>
                            <p>
                              {defaultAddressObj.firstName} {defaultAddressObj.lastName}
                            </p>
                            <p>{defaultAddressObj.address}</p>
                            <p>
                              {defaultAddressObj.city}, {defaultAddressObj.state}{" "}
                              {defaultAddressObj.zipcode}
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
                            <>
                              {defaultAddressObj.id == address.id && (
                                <div
                                  key={idx}
                                  className={`address-container address-container${address.id} address-active`}
                                >
                                  <input
                                    type="radio"
                                    id={`address${address.id}`}
                                    name="address-selection"
                                    onClick={() =>
                                      handleAddressSelection(address.id)
                                    }
                                    defaultChecked={true}
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
                              )}
                              {defaultAddressObj.id != address.id && (
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
                              )}
                            </>
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
                              <img src={card} />
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
                            <>
                              {finalPayment.id == payment.id && (
                                <div
                                  key={idx}
                                  className={`payment-container payment-container${payment.id} payment-active`}
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
                                        defaultChecked={true}
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
                              )}
                              {finalPayment.id != payment.id && (
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
                              )}
                            </>
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
                  {cartItems !== undefined && (

                  <div className="items-outer-container">
                    {cartItems.map((item, idx) => {
                      total += item.quantity * item.product.price;
                      if (!deliverySetting[idx]) deliverySetting[idx] = 3;

                      return (
                        <div key={idx} className="item-outer-container">
                          {idx == 0 && (
                            <div className="item-top-addition-container">
                              <div className="item-addition-img"></div>
                              <h5>
                                Get a $4 discount with FREE No-Rush Shipping.
                              </h5>
                              <p>
                                Select No-Rush Shipping below to receive a $4
                                discount to use towards this order.
                              </p>
                            </div>
                          )}
                          <div className="item-delivery-container">
                            <p>
                              <span
                                className={`item-delivery-span bold-green-text item-delivery-${idx}`}
                              >
                                Delivery: {monthThree} {dayThree}, {todayYear}
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
                                <p>
                                  Sold by: <span>Congo</span>
                                </p>
                              </div>
                            </div>
                            <div className="item-right-container">
                              <p>Choose your Prime delivery option:</p>
                              <div className="item-shipping-radio-container">
                                <input
                                  type="radio"
                                  defaultChecked={true}
                                  id={`fast-shipping-${idx}`}
                                  name={`shipping-input-${idx}`}
                                  onClick={() => handleShippingChange(3, idx)}
                                />
                                <label for={`fast-shipping-${idx}`}>
                                  <p className="bold-green-text">
                                    {weekDayThree}, {monthThree} {dayThree}
                                  </p>
                                  <p>
                                    FREE <span>Prime Delivery</span>
                                  </p>
                                </label>
                              </div>
                              <div className="item-shipping-radio-container">
                                <input
                                  type="radio"
                                  id={`mid-shipping-${idx}`}
                                  name={`shipping-input-${idx}`}
                                  onClick={() => handleShippingChange(4, idx)}
                                />
                                <label for={`mid-shipping-${idx}`}>
                                  <p className="bold-green-text">
                                    {weekDayFour}, {monthFour} {dayFour}
                                  </p>
                                  <p>
                                    FREE <span>Congo Day Delivery</span>
                                  </p>
                                  <p>Arrive a day later.</p>
                                </label>
                              </div>
                              <div className="item-shipping-radio-container">
                                <input
                                  type="radio"
                                  id={`slow-shipping-${idx}`}
                                  name={`shipping-input-${idx}`}
                                  onClick={() => handleShippingChange(9, idx)}
                                />
                                <label for={`slow-shipping-${idx}`}>
                                  <p className="bold-green-text">
                                    {weekDayNine}, {monthNine} {dayNine}
                                  </p>
                                  <p>
                                    FREE <span>No-Rush Shipping</span>
                                  </p>
                                  <p>
                                    Get a $4 reward for select digital
                                    purchases. One reward per purchase.
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="item-outer-container checkout-bottom-place-container">
                      <div className="place-order-button checkout-bottom-button">
                        Place your order
                      </div>
                      <div className="checkout-bottom-right-container">
                        <p>
                          Order total: $
                          {numToCash(total - discount + total * 0.0825)}
                        </p>
                        <p>
                          By placing your order, you agree to Congo's privacy
                          notice and conditions of use.
                        </p>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
              <div className="checkout-bottom-divider"></div>
              <div className="checkout-bottom-text-container">
                <p>
                  For an item sold by Congo.com: When you click the "Place your
                  order" button, we will not send you an email message
                  acknowledging receipt of your order. Your contract to purchase
                  an item will not be complete until we send you an email
                  notifying you that the item has been shipped.
                </p>
                <p>
                  You may return new, unopened merchandise in original condition
                  within 30 days of delivery. Exceptions and restrictions apply.
                </p>
                <p>
                  Need to add more items to your order? Continue shopping on the{" "}
                  <span onClick={() => history.push("/")}>
                    Congo.com homepage.
                  </span>
                </p>
              </div>
            </div>
            <div className="checkout-right-outer-container">
              <div className="checkout-right-container">
                <div className="place-order-button">Place your order</div>
                <p>
                  By placing your order, you agree to Congo's privacy notice and
                  conditions of use.
                </p>
                <hr />
                <h3>Order Summary</h3>
                <div className="order-summary-flex">
                  <p>Items ({cart.totalQuantity}):</p>
                  <p>${numToCash(total)}</p>
                </div>
                <div className="order-summary-flex">
                  <p>Discount:</p>
                  <p>-${discount}</p>
                </div>
                <div className="order-summary-flex">
                  <p>Shipping & handling:</p>
                  <p>$0</p>
                </div>
                <div className="order-summary-flex order-summary-divider">
                  <hr />
                  <hr />
                </div>
                <div className="order-summary-flex">
                  <p>Total before tax:</p>
                  <p>${numToCash(total - discount)}</p>
                </div>
                <div className="order-summary-flex">
                  <p>Estimated tax to be collected:</p>
                  <p>${numToCash(total * 0.0825)}</p>
                </div>
                <hr />
                <div className="order-summary-flex order-summary-total">
                  <p>Order total:</p>
                  <p>${numToCash(total - discount + total * 0.0825)}</p>
                </div>
                <div className="checkout-right-bottom-container">
                  <p>Qualifying offers:</p>
                  <ul>
                    <li>Free Shipping</li>
                  </ul>
                  <p>
                    Prime shipping benefits have been applied to your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
