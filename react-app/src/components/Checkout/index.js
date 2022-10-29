import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAddresses } from "../../store/address";
import { Modal } from "../../context/Modal";
import CreateAddress from "../Forms/Address/createAddress";
import Address from "../Address";

function Checkout() {
  const [loaded, setLoaded] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const addresses = useSelector((state) =>
    Object.values(state.addresses.addresses)
  );

  useEffect(() => {
    (async () => {
      await dispatch(loadAllAddresses(userId));
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {showAddressModal && (
        <Modal onClose={() => setShowAddressModal(false)}>
          <CreateAddress setShowAddressModal={setShowAddressModal} />
        </Modal>
      )}
      {addresses &&
        addresses.map((address, idx) => {
          return (
            <div key={idx}>
              <Address address={address} />
            </div>
          );
        })}
    </>
  );
}

export default Checkout;
