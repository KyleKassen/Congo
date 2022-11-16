import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import picon from "../../media/images/primeicons.png";
import "./cart.css";

function Cart() {
  const history = useHistory();
  const [quantities, setQuantities]= useState({});
  const [currentItem, setCurrentItem] = useState(0);

  const cartItems = useSelector((state) => Object.values(state.cart.items));

  const updateQuantity = async (itemId, quantity) => {};

  const showCustomForm = (itemId) => {
    const dropDownContainer = document.getElementById(`item-${itemId}dropdown`)
    dropDownContainer.classList.add('disable-quantity-selection')
  };

  const handleChange = (itemId, e) => {
    const currentQantities = quantities;
    quantities[itemId] = e.target.value;

    setQuantities({...currentQantities})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log('first variable is :', e)
    console.log('second variable is :', currentItem)
  }

  // Get rid of input field changing when scrolling
  document.addEventListener("wheel", function(event){
    if(document.activeElement.type === "number"){
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
                        <p className="cart-item-title">{item.product.title}</p>
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
                        <div className={`class-item-quantity-drop-down`} id={`item-${item.id}dropdown`}>
                          <div className="class-item-quantity-button">
                            <p>
                              Qty: <span>{item.quantity}</span> <i></i>
                            </p>
                          </div>
                          <ul>
                            <li>0 (Delete)</li>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                              if (num === item.quantity && item.quantity < 10) {
                                return (
                                  <li
                                    className="class-item-quantity-active"
                                    onClick={() => updateQuantity(item.id, num)}
                                  >
                                    {num}
                                  </li>
                                );
                              } else if (num === 10 && item.quanity > 9) {
                                return (
                                  <li className="class-item-quantity-active class-item-10plus" onClick={() => showCustomForm(item.id)}>
                                    10+
                                  </li>
                                );
                              } else if (num === 10) {
                                return <li className="class-item-10plus" onClick={() => showCustomForm(item.id)}>10+</li>;
                              } else {
                                return <li>{num}</li>;
                              }
                            })}
                          </ul>
                        </div>
                        <div className={`class-item-custom-quantity`} id={`item-${item.id}custom`}>
                            <form className="class-item-custom-form" onSubmit={handleSubmit}>
                              <div className="custom-quantity-form-field">
                                <input
                                  className="custom-quantity-input-field"
                                  type="number"
                                  value={quantities[item.id]}
                                  onChange={(e) => handleChange(item.id, e)}/>
                              </div>
                              <button type="submit" onClick={() => setCurrentItem(item.id)}>Update</button>
                            </form>
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
