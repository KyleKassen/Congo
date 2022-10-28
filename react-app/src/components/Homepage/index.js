import React, { useState, useEffect } from "react";
import Carousel from '../Carousel'
import { useSelector } from "react-redux";
import "./homepage.css";

function Homepage() {
  let products = useSelector(state => Object.values(state.products.allProducts))

  let saleProducts = []
  for(let product in products) {
    if(product.salePrice) {
      saleProducts.push(product)
    }
  }


  console.log(products[1].images[0].url)

  return (
    <>
      <Carousel />
      <div className="home-outer-wrapper">
        <div className="home-outer-container">
          {saleProducts.map(product => {
            return (
              <div className="home-flex-item">
                <h2>{product.title.slice(0,15)}</h2>
              </div>
            )
          })}





        </div>
      </div>
    </>
  );
}

export default Homepage;
