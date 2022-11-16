import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { edit, editCartItem, loadCartItems } from "../../store/cart";
import picon from "../../media/images/primeicons.png";
import "./cart.css";

function Cart() {
  const [quantities, setQuantities] = useState({});
  const [currentItem, setCurrentItem] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => Object.values(state.cart.items));
  const userId = useSelector(state => state.session.user.id)

  const updateQuantity = async (itemId, quantity) => {
    console.log(`quantity is : ${quantity}`)
    const response = await dispatch(editCartItem(itemId, quantity))

  };

  const showCustomForm = (itemId) => {
    const dropDownContainer = document.getElementById(`item-${itemId}dropdown`);
    dropDownContainer.classList.add("disable-quantity-selection");
    const customQuantityContainer = document.getElementById(
      `item-${itemId}custom`
    );
    customQuantityContainer.classList.add("show-custom-quantity");
  };

  const handleChange = (itemId, e) => {
    const currentQantities = quantities;
    quantities[itemId] = e.target.value;

    const re = /^[0-9\b]+$/;

    // Only set it if its a number
    if (e.target.value === "" || re.test(e.target.value)) {
      setQuantities({ ...currentQantities });
    } else {
      quantities[itemId] = "";
      setQuantities({ ...currentQantities });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('first variable is :', e)
    console.log("second variable is :", currentItem);
    updateQuantity(currentItem, quantities[currentItem])
  };

  // Get rid of input field changing when scrolling
  document.addEventListener("wheel", function (event) {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });

  return (
    <>
      <div className="cart-outer-wrapper">
        <div className="cart-flex-container">
          <div className="cart-left-right-container">
            <div className="cart-left-container">
              <h2>Shopping Cart</h2>
              <p>Price</p>
              <div className="cart-items-container">
                {cartItems.map((item) => {
                  return (
                    <div className="cart-item-container">
                      <div className="cart-item-img-container">
                        <img src={`${item.product.image.url}`} />
                      </div>
                      <div className="cart-item-middle-container">
                        <div className="cart-item-upper-half-container">
                          <p className="cart-item-title">
                            {item.product.title}
                          </p>
                          <p className="cart-item-instock">In Stock</p>
                          <p className="cart-item-bottom-p">
                            Shipped from:{" "}
                            <span onClick={() => history.push("/")}>
                              Congo.com
                            </span>
                          </p>
                          <p className="cart-item-bottom-p">
                            Gift options not available.
                          </p>
                          <div className="cart-item-prime-container">
                            <div className="cart-item-prime-icon"></div>
                            <p>
                              Eligible for FREE Same-Day, Overnight or Tomorrow
                              delivery
                            </p>
                          </div>
                        </div>
                        <div className="cart-item-bottom-half-container">
                          <div
                            className={`cart-item-quantity-drop-down`}
                            id={`item-${item.id}dropdown`}
                          >
                            <div className="cart-item-quantity-button">
                              <p>
                                Qty: <span>{item.quantity}</span> <i></i>
                              </p>
                            </div>
                            <ul>
                              <li onClick={() => updateQuantity(item.id, 0)}>0 (Delete)</li>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                                if (
                                  num === item.quantity &&
                                  item.quantity < 10
                                ) {
                                  return (
                                    <li
                                      className="cart-item-quantity-active"
                                      onClick={() =>
                                        updateQuantity(item.id, num)
                                      }
                                    >
                                      {num}
                                    </li>
                                  );
                                } else if (num === 10 && item.quantity > 9) {
                                  return (
                                    <li
                                      className="cart-item-quantity-active cart-item-10plus"
                                      onClick={() => showCustomForm(item.id)}
                                    >
                                      10+
                                    </li>
                                  );
                                } else if (num === 10) {
                                  return (
                                    <li
                                      className="cart-item-10plus"
                                      onClick={() => showCustomForm(item.id)}
                                    >
                                      10+
                                    </li>
                                  );
                                } else {
                                  return <li onClick={() => updateQuantity(item.id, num)}>{num}</li>;
                                }
                              })}
                            </ul>
                          </div>
                          <div
                            className={`cart-item-custom-quantity`}
                            id={`item-${item.id}custom`}
                          >
                            <form
                              className="cart-item-custom-form"
                              onSubmit={handleSubmit}
                            >
                              <div className="custom-quantity-form-field">
                                <input
                                  className="custom-quantity-input-field"
                                  type="text"
                                  maxlength="3"
                                  value={quantities[item.id]}
                                  onChange={(e) => handleChange(item.id, e)}
                                />
                              </div>
                              <button
                                type="submit"
                                onClick={() => setCurrentItem(item.id)}
                              >
                                Update
                              </button>
                            </form>
                          </div>
                          <i className="cart-bottom-divider"></i>
                          <p className="cart-bottom-delete-button">Delete</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cart-right-container">
              <p>right column</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
