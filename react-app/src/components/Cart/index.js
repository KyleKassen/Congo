import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import picon from "../../media/images/primeicons.png";
import "./cart.css";

function Cart() {
  const history = useHistory();

  const cartItems = useSelector((state) => Object.values(state.cart.items));

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
                        <div className="class-item-quantity-drop-down">
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
                                  <li className="class-item-quantity-active">
                                    {num}
                                  </li>
                                );
                              } else if(num === 10 && item.quanity > 9) {
                                return <li className="class-item-quantity-active">10+</li>
                              } else {
                                return <li>{num}</li>
                              }
                            })}
                          </ul>
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
