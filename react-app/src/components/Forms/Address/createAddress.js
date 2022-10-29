import React, { useEffect, useState } from "react";
import {useParams, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOneAddress } from "../../../store/address";

function CreateAddress() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {

  }, [address, city, state, zipCode])

  const handleSubmit = async(e) => {
    e.preventDefault()

    const newaddress = {
        address,
        city,
        state,
        zipCode,
    }

    try {
        const response = await dispatch(createOneAddress(newaddress))
        console.log(response)
    } catch (res) {
        console.log(res)
        console.log("ERROR IN address FORM RESPONSE")
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
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
            type="number"
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
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
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
    </>
  );
}

export default CreateAddress;
