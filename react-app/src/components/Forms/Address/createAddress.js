import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOneAddress } from "../../../store/address";
import "./addressForm.css";

function CreateAddress({ setShowAddressModal }) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {}, [address, city, state, zipcode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newaddress = {
      address,
      city,
      state,
      zipcode,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await dispatch(createOneAddress(newaddress));
      console.log(response);
    } catch (res) {
      console.log(res);
      console.log("ERROR IN address FORM RESPONSE");
    }

    setShowAddressModal(false);
  };

  return (
    <div className="address-form-container">
      <div className="address-form-header-container">
        <h4>Enter a new shipping address</h4>
        <div className="address-form-close-button-container">
          <i></i>
        </div>
      </div>
      <div className="address-form-bottom-section">
        <h2>Add a new address</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="address-name-fields">
            <div className="address-first-name">
              <p>First name</p>
              <input
                id="form-field-address"
                className="form-field"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                id="form-field-address"
                className="form-field"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <p>Address</p>
            <input
              id="form-field-address"
              className="form-field"
              placeholder="Street address or P.O. Box"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="address-flex-inputs">
          <div>
            <input
              id="form-field-city"
              className="form-field"
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              id="form-field-state"
              className="form-field"
              placeholder="State"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              id="form-field-zipcode"
              className="form-field"
              placeholder="ZipCode"
              type="number"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </div>
          </div>
          <button
            id="create-address-button"
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

export default CreateAddress;
