import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAddresses, editDefaultAddress } from "../../store/address";
import { Modal } from "../../context/Modal";
import CreateAddress from "../Forms/Address/createAddress";
import Address from "./index";
import plusicon from "../../media/images/plus.png";
import "./addressList.css";

function AddressList({setShowAddressList}) {
    const [loaded, setLoaded] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState({});
    const [changeAddress, setChangeAddress] = useState(false);
    const [finalAddress, setFinalAddress] = useState({});
    const [showAddressModal, setShowAddressModal] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session?.user?.id);
  const addressObj = useSelector((state) => state.addresses.addresses);
  const defaultAddressObj = useSelector(state => state.addresses.default);
  const addresses = Object.values(addressObj);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllAddresses(userId));
      setLoaded(true);
    })();
  }, [dispatch]);

  const handleUseAddress = async () => {
    setFinalAddress(defaultAddress);
    await dispatch(editDefaultAddress(defaultAddress.id));
    setChangeAddress(false);
    setShowAddressList(false);
  };

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
  return (
    <div>
      <div className="address-list-outer-container">
        <div className="address-list-container">
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
                        onClick={() => handleAddressSelection(address.id)}
                        defaultChecked={true}
                      />
                      <label for={`address${address.id}`}>
                        <span>
                          {address.firstName} {address.lastName}{" "}
                        </span>
                        {address.address}, {address.city}, {address.state},{" "}
                        {address.zipcode}, United States{" "}
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
                        onClick={() => handleAddressSelection(address.id)}
                      />
                      <label for={`address${address.id}`}>
                        <span>
                          {address.firstName} {address.lastName}{" "}
                        </span>
                        {address.address}, {address.city}, {address.state},{" "}
                        {address.zipcode}, United States{" "}
                        <Address
                          address={address}
                          setFinalAddress={setFinalAddress}
                          setChangeAddress={setChangeAddress}
                          setShowAddressList={setShowAddressList}
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
                  setShowAddressList={setShowAddressList}
                />
              </Modal>
            )}
          </div>
        </div>
        <div className="address-list-bottom-container">
          <div
            className="shipping-use-address yellow-checkout-button"
            onClick={() => handleUseAddress()}
          >
            Use this address
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressList;
