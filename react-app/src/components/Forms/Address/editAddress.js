import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOneAddress } from "../../../store/address";
import "./addressForm.css";

function EditAddress({
  setShowModal,
  addressId,
  setFinalAddress,
  setChangeAddress,
}) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);
  const addressToEdit = useSelector(
    (state) => state.addresses.addresses[addressId]
  );

  useEffect(() => {
    setAddress(addressToEdit.address);
    setCity(addressToEdit.city);
    setState(addressToEdit.state);
    setZipCode(addressToEdit.zipcode);
    setFirstName(addressToEdit.firstName);
    setLastName(addressToEdit.lastName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateAddress = {
      address,
      city,
      state,
      zipcode: zipCode,
      first_name: firstName,
      last_name: lastName,
    };

    let response;

    let currentErrors = {}

    if (!firstName) currentErrors['firstName'] = 'Please enter a first name.'
    if (!lastName) currentErrors['lasttName'] = "Please enter a last name."
    if (!zipCode) currentErrors['zipCode'] = "Please enter a ZIP or postal code."
    if (!/^\d+$/.test(zipCode) || String(zipCode).length != 5) currentErrors['zipCode'] = "Please enter a valid ZIP or postal code."
    if (!city) currentErrors['city'] = "Please enter a city name."
    if (/\d/.test(city) ) currentErrors['city'] = "Please enter a valid city name."
    if (!state) currentErrors['state'] = "Please enter a state name."
    if (/\d/.test(state) ) currentErrors['state'] = "Please enter a valid state name."
    if (!address) currentErrors['address'] = "Please enter an address."

    setErrors([...Object.values(currentErrors)])

    if (Object.values(currentErrors).length) return;

    try {
      response = await dispatch(updateOneAddress(updateAddress, addressId));

    } catch (res) {

    }
    setFinalAddress(response);
    setChangeAddress(false);
    setShowModal(false);
  };

  return (
    <div className="address-form-container">
      <div className="address-form-header-container">
        <h4>Update your shipping address</h4>
        <div className="address-form-close-button-container" onClick={() => setShowModal(false)}>
          <i></i>
        </div>
      </div>
      <div className="address-form-bottom-section">
        <h2>Edit your address</h2>
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
          <div className="address-name-fields">
            <div className="address-first-name">
              <p>First name</p>
              <input
                id="form-field-address"
                className="form-field"
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                id="form-field-address"
                className="form-field"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p>Address</p>
            <input
              id="form-field-address"
              className="form-field"
              placeholder="Street"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="address-flex-inputs">
            <div className="address-city-container">
              <p>City</p>
              <input
                id="form-field-city"
                className="form-field"
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="address-state-container">
              <p>State</p>
              <input
                id="form-field-state"
                className="form-field"
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <p>Zip Code</p>
              <input
                id="form-field-zipcode"
                className="form-field"
                placeholder="ZipCode"
                type="text"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
          <button
            id="edit-address-button"
            className="button review-button-submit"
            type="submit"
          >
            Use this address
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAddress;
