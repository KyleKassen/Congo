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
      card_exp: cardExp,
      security_code: securityCode,
    };

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
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="form-middle-container">
            <div className="form-middle-left-container">
              <div className="input-container">
                <p>Card number</p>
                <input
                  id="form-field-cardnumber"
                  className="form-field"
                  // placeholder="Card Number"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <p>Name on card</p>
                <input
                  id="form-field-cardholder"
                  className="form-field"
                  // placeholder="Card Holder"
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
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
                <div className="security-input-container">
                <input
                  id="form-field-securitycode"
                  className="form-field"
                  // placeholder="Security Code"
                  type="password"
                  maxLength="4"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                />
                <span>(<span className="interactive-text">What's this?</span>)</span>
                <div className="popup-arrow">
                <div className="popup-inner-arrow"></div>
                </div>
                <div className="security-code-info-container">
                  <p>The CVV number is the last three digits at the back of your card. For American Express cards, the CVV is a 4-digit number on the front of the card.</p>
                  <div>
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
            <div className="form-cancel-button">Cancel</div>
            <button
              id="edit-payment-button"
              className="button button-submit yellow-button"
              type="submit"
              disabled={errors.length}
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
