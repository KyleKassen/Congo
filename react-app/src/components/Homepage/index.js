import React, { useState, useEffect } from "react";
import Carousel from "../Carousel";
import { useSelector } from "react-redux";
import "./homepage.css";

function Homepage() {
  let products = useSelector((state) =>
    Object.values(state.products.allProducts)
  );

  let saleProducts = [];
  for (let product of products) {
    // console.log(product)
    if (product.salePrice) {
      saleProducts.push(product);
    }
  }

  // console.log(products)

  return (
    <div className="homepage-wrapper">
      <Carousel />
      <div className="home-outer-wrapper">
        <div className="home-outer-container">
          {saleProducts.map((product) => {
            let salePercentage = (
              1 -
              product.salePrice / product.price
            ).toString();
            let formatPerc = salePercentage.slice(2, 4);
            return (
              <div className="home-flex-item">
                <h2>Epic Deals</h2>
                <div className="home-product-img-container">
                  <img src={product.images[0].url} />
                </div>
                <p>
                  {formatPerc}% off <span>Top deal</span>
                </p>
                <p>
                  ${product.salePrice} List Price: {product.price}
                </p>
                <p>{product.title.slice(0, 45)} ...</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
