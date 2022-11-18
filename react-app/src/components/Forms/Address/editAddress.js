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

    try {
      response = await dispatch(updateOneAddress(updateAddress, addressId));
      console.log(response);
    } catch (res) {
      console.log(res);
      console.log("ERROR IN address FORM RESPONSE");
    }
    setFinalAddress(response);
    setChangeAddress(false);
    setShowModal(false);
  };

  return (
    <div className="address-form-container">
      <div className="address-form-header-container">
        <h4>Update your shipping address</h4>
        <div className="address-form-close-button-container">
          <i></i>
        </div>
      </div>
      <div className="address-form-bottom-section">
        <h2>Edit your address</h2>
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
                placeholder="First Name"
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
                placeholder="Last Name"
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
              placeholder="Street"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
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
                required
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
                required
              />
            </div>
            <div>
              <p>Zip Code</p>
              <input
                id="form-field-zipcode"
                className="form-field"
                placeholder="ZipCode"
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            id="edit-address-button"
            className="button review-button-submit"
            type="submit"
            disabled={errors.length}
          >
            Use this address
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAddress;
