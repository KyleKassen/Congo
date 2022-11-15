import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./cart.css";

function Cart() {

    const cartItems = useSelector(state => Object.values(state.cart.items))

  return (
    <>
      <div className="cart-outer-wrapper">
        <div className="cart-flex-container">
          <div className="cart-left-right-container">
            <div className="cart-left-container">
              <h2>Shopping Cart</h2>
              <p>Price</p>
              <div className="cart-items-container">
                {cartItems.map(item => {
                    return (
                        <>
                        
                        </>
                    )
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
