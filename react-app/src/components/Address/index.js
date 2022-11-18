import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditAddress from "../Forms/Address/editAddress";
import { deleteOneAddress } from "../../store/address";
import { Modal } from "../../context/Modal";

function Address({ address, setFinalAddress, setChangeAddress}) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const deleteAddress = async () => {
    await dispatch(deleteOneAddress(address.id));
    // return null;
  };

  return (
    <>
      <span className="address-button-span checkout-text-hover" onClick={() => setShowModal(true)}>Edit address</span>{" | "}
      <span className="address-button-span checkout-text-hover" onClick={() => deleteAddress(address.id)}>Delete address</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAddress setShowModal={setShowModal} addressId={address.id} setFinalAddress={setFinalAddress} setChangeAddress={setChangeAddress}/>
        </Modal>
      )}
    </>
  );
}

export default Address;
