import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOnepayment } from "../../../store/payment";
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

  const handleMonthClick = month => {
    setShowMonths(false)
    setCardMonth(month)
  }

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
                if(!showMonths) setShowMonths(true)
              }}
              onMouseLeave={() => setShowMonths(false)}
            >
              <span>{cardMonth}</span>
              <i className="icon-dropdown"></i>
              {showMonths && (
                <div className="months-dropdown dropdown-container">
                  <ul>
                    {months.map((month, idx) => {
                      return <li key={idx} onClick={() => handleMonthClick(month)}>{month}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div
              className="exp-year dropdown-button"
              onClick={() => setShowYears(true)}
            >
              <span>{cardYear}</span>
              <i className="icon-dropdown"></i>
              {showYears && (
                <div className="years-dropdown dropdown-container"></div>
              )}
            </div>
          </div>
          <div className="input-container">
            <p>
              <span>Security Code </span>
              <span>(CVV/CVC)</span>
            </p>
            <input
              id="form-field-securitycode"
              className="form-field"
              // placeholder="Security Code"
              type="number"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
          </div>
          <button
            id="edit-payment-button"
            className="button button-submit"
            type="submit"
            disabled={errors.length}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePayment;
