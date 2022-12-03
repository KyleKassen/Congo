import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOnepayment } from "../../../store/payment";
import cvv from "../../../media/images/cvv.gif";
import "./paymentForm.css";

function CreatePayment({
  setShowPaymentModal,
  setFinalPayment,
  setChangePayment,
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardMonth, setCardMonth] = useState("01");
  const [cardYear, setCardYear] = useState("2022");
  const [securityCode, setSecurityCode] = useState("");
  const [errors, setErrors] = useState([]);

  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const years = [
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
  ];

  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {}, [cardNumber, cardHolder, cardExp, securityCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPayment = {
      card_number: cardNumber,
      card_holder: cardHolder,
      card_exp: `${cardMonth}${cardYear.slice(2, 4)}`,
      security_code: securityCode,
    };

    let currentErrors = [];

    const intCardMonth = parseInt(cardMonth);
    const intCardYear = parseInt(cardYear);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    console.log(currentYear + '<' + intCardYear + "<" + currentMonth + "< " + intCardMonth)

    if (!/^\d+$/.test(cardNumber) || cardNumber.length < 15)
      currentErrors.push("Card number is not correct.");
    if (
      intCardYear < currentYear ||
      (intCardYear == currentYear && currentMonth >= intCardMonth)
    )
      currentErrors.push("Expiration date is not correct.");
    if (!/^\d+$/.test(securityCode) || securityCode.length < 3)
      currentErrors.push(
        "Security code (CVV) is not correct. Look for the 3-digit code on the back of the card."
      );
    if (!cardHolder) currentErrors.push("Cardholder's name is required.")

    if (currentErrors.length > 0) {
      setErrors([...currentErrors]);
      return;
    }

    let response;

    try {
      const response = await dispatch(createOnepayment(newPayment));
      console.log(response);
    } catch (res) {
      console.log(res);
      console.log("ERROR IN payment FORM RESPONSE");
    }
    setShowPaymentModal(false);
    setFinalPayment({ ...response });
    setChangePayment(false);
  };

  const handleMonthClick = (month) => {
    setShowMonths(false);
    setCardMonth(month);
  };

  const handleYearClick = (year) => {
    setShowYears(false);
    setCardYear(year);
  };

  const handleCVVPopup = (display) => {
    const popup = document.getElementsByClassName(
      "security-code-info-container"
    )[0];
    const popupArrow = document.getElementsByClassName("popup-arrow")[0];
    const popupArrowInner =
      document.getElementsByClassName("popup-inner-arrow")[0];
    if (display) {
      popup.style.display = "block";
      popupArrow.style.display = "block";
      popupArrowInner.style.display = "block";
      // popupArrow.style.opacity = 1;
      // popupArrowInner.style.opacity = 1;
      // popup.style.opacity = 1;
    } else {
      popup.style.display = "none";
      popupArrow.style.display = "none";
      popupArrowInner.style.display = "none";
      // popup.style.opacity = 0;
      // popupArrow.style.opacity = 0;
      // popupArrowInner.style.opacity = 0;
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-header-container">
        <h4>Add a debit card</h4>
        <div
          className="payment-form-close-button-container"
          onClick={() => setShowPaymentModal(false)}
        >
          <i></i>
        </div>
      </div>
      <div className="payment-form-bottom-section">
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="payment-error-outer-container">
              <div className="payment-error-container">
                <i></i>
                <h4>There was a problem.</h4>
                <ul>
                  {errors.map((error, ind) => (
                    <li key={ind}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="form-middle-container">
            <div className="form-middle-left-container">
              <div className="input-container">
                <p>Card number</p>
                <input
                  id="form-field-cardnumber"
                  className="form-field"
                  // placeholder="Card Number"
                  type="text"
                  maxLength="16"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  // required
                />
              </div>
              <div className="input-container">
                <p>Name on card</p>
                <input
                  id="form-field-cardholder"
                  className="form-field"
                  // placeholder="Card Holder"
                  type="text"
                  maxLength="50"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  // required
                />
              </div>
              <div className="input-container">
                <p>Expiration date</p>
                <div
                  className="exp-month dropdown-button"
                  onClick={() => {
                    if (!showMonths) setShowMonths(true);
                  }}
                  onMouseLeave={() => setShowMonths(false)}
                >
                  <span>{cardMonth}</span>
                  <i className="icon-dropdown"></i>
                  {showMonths && (
                    <div className="months-dropdown dropdown-container">
                      <ul>
                        {months.map((month, idx) => {
                          return month == cardMonth ? (
                            <li
                              key={idx}
                              className="active-list-item"
                              onClick={() => handleMonthClick(month)}
                            >
                              {month}
                            </li>
                          ) : (
                            <li
                              key={idx}
                              onClick={() => handleMonthClick(month)}
                            >
                              {month}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
                <div
                  className="exp-year dropdown-button"
                  onClick={() => {
                    if (!showYears) setShowYears(true);
                  }}
                  onMouseLeave={() => setShowYears(false)}
                >
                  <span>{cardYear}</span>
                  <i className="icon-dropdown"></i>
                  {showYears && (
                    <div className="years-dropdown dropdown-container">
                      <ul>
                        {years.map((year, idx) => {
                          return year == cardYear ? (
                            <li
                              key={idx}
                              className="active-list-item"
                              onClick={() => handleYearClick(year)}
                            >
                              {year}
                            </li>
                          ) : (
                            <li key={idx} onClick={() => handleYearClick(year)}>
                              {year}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="input-container">
                <p>
                  <span>Security Code </span>
                  <span>(CVV/CVC)</span>
                </p>
                <div
                  className="security-input-container"
                  onMouseLeave={() => handleCVVPopup(false)}
                >
                  <input
                    id="form-field-securitycode"
                    className="form-field"
                    // placeholder="Security Code"
                    type="password"
                    maxLength="4"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    // required
                  />
                  <span>
                    (
                    <span
                      className="interactive-text"
                      onMouseEnter={() => handleCVVPopup(true)}
                    >
                      What's this?
                    </span>
                    )
                  </span>
                  <div className="popup-arrow">
                    <div className="popup-inner-arrow"></div>
                  </div>
                  <div
                    className="security-code-info-container"
                    onMouseEnter={() => handleCVVPopup(true)}
                    onMouseLeave={() => handleCVVPopup(false)}
                  >
                    <p>
                      The CVV number is the last three digits at the back of
                      your card. For American Express cards, the CVV is a
                      4-digit number on the front of the card.
                    </p>
                    <div onClick={() => handleCVVPopup(false)}>
                      <i></i>
                    </div>
                    <img src={cvv} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-middle-right-container">
              <p>Congo accepts all major debit cards:</p>
              <i className="card1"></i>
              <i className="card2"></i>
              <i className="card3"></i>
              <i className="card4"></i>
              <i className="card5"></i>
              <i className="card6"></i>
              <i className="card7"></i>
              <i className="card8"></i>
              <i className="card9"></i>
              <i className="card10"></i>
              <i className="card11"></i>
              <i className="card12"></i>
            </div>
          </div>
          <div className="form-bottom-buttons-container">
            <div
              className="form-cancel-button"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </div>
            <button
              id="edit-payment-button"
              className="button button-submit yellow-button"
              type="submit"
              // disabled={errors.length}
            >
              Add your card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePayment;
