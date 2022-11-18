import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Carousel from "../Carousel";
import { useSelector } from "react-redux";
import "./homepage.css";

function Homepage() {
  let products = useSelector((state) =>
    Object.values(state.products.allProducts)
  );

  const history = useHistory();

  // let saleProducts = [];
  // for (let product of products) {
  //   // console.log(product)
  //   if (product.salePrice) {
  //     saleProducts.push(product);
  //   }
  // }

  // console.log(products)

  const getStars = (rating, addon) => {
    return (
      <>
        {rating > 4.6 && (
          <i className={`stars-img product-5-stars${addon}`}></i>
        )}
        {rating <= 4.6 && rating > 4 && (
          <i className={`stars-img product-45-stars${addon}`}></i>
        )}
        {rating <= 4 && rating > 3.6 && (
          <i className={`stars-img product-4-stars${addon}`}></i>
        )}
        {rating <= 3.6 && rating > 3 && (
          <i className={`stars-img product-35-stars${addon}`}></i>
        )}
        {rating <= 3 && rating > 2.6 && (
          <i className={`stars-img product-3-stars${addon}`}></i>
        )}
        {rating <= 2.6 && rating > 2 && (
          <i className={`stars-img product-25-stars${addon}`}></i>
        )}
        {rating <= 2 && rating > 1.6 && (
          <i className={`stars-img product-2-stars${addon}`}></i>
        )}
        {rating <= 1.6 && rating > 1 && (
          <i className={`stars-img product-15-stars${addon}`}></i>
        )}
        {rating <= 1 && rating > 0.6 && (
          <i className={`stars-img product-1-stars${addon}`}></i>
        )}
        {rating <= 0.6 && rating != null && (
          <i className={`stars-img product-05-stars${addon}`}></i>
        )}
        {rating == null && (
          <i className={`stars-img product-0-stars${addon}`}></i>
        )}
      </>
    );
  };

  return (
    <div className="homepage-wrapper">
      <Carousel />
      <div className="home-outer-wrapper">
        <div className="home-outer-container">
          {products.map((product) => {
            // let salePercentage = (
            //   1 -
            //   product.salePrice / product.price
            // ).toString();
            // let formatPerc = salePercentage.slice(2, 4);
            return (
              <div
                className="home-flex-item"
                onClick={() => history.push(`/product/${product.id}`)}
              >
                {/* <h2>Epic Deals</h2> */}
                <div className="home-product-img-container">
                  <img src={product.images[0].url} />
                </div>
                {/* <p>
                  {formatPerc}% off <span>Top deal</span>
                </p> */}
                {/* <p>
                  ${product.salePrice} List Price: {product.price}
                </p> */}
                {product.title.length > 80 && (
                  <p>{product.title.slice(0, 80)} ...</p>
                )}
                {product.title.length <= 80 && <p>{product.title}</p>}
                <div className="product-rating-container">
                  <div className="product-star-rating">
                    {getStars(product.rating, "")}
                  </div>
                  <div className="product-rating-count">
                    <span>{product.reviewCount} ratings</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
