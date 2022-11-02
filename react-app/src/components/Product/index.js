import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOneProduct } from "../../store/product";
import { loadAllReviews } from "../../store/review";
import { loadAllAddresses } from "../../store/address";
import EditReview from "../Forms/ReviewForms/editReview";
import Review from "../Review/index";

import locationpin from "../../media/images/buyboxlocation.png";
import lock from "../../media/images/greyLock.png";

import "./product.css";

function Product() {
  const [loaded, setLoaded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.products.singleProduct);
  const reviews = useSelector((state) =>
    Object.values(state.reviews.productReviews)
  );
  const addresses = useSelector((state) =>
    Object.values(state.addresses?.addresses)
  );
  const userId = useSelector((state) => state.session.user?.id);

  useEffect(() => {
    (async () => {
      await dispatch(loadOneProduct(productId));
      await dispatch(loadAllReviews(productId));
      if (userId) {
        {
          await dispatch(loadAllAddresses(userId));
        }
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  let objTodayThree = new Date();
  let objTodayFive = new Date();
  objTodayThree.setDate(objTodayThree.getDate() + 3);
  objTodayFive.setDate(objTodayFive.getDate() + 5);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthThree = months[objTodayThree.getMonth()];
  const dayThree = objTodayThree.getDate();
  const monthFive = months[objTodayFive.getMonth()];
  const dayFive = objTodayFive.getDate();

  let createReview = async () => {
    history.push(`/product/${productId}/create`);
  };

  return (
    <div className="product-page-outer-wrapper">
      <div className="product-page-wrapper">
        <div className="product-left-wrapper">
          <div className="product-img-list">
            {product.images.map((img, idx) => {
              return (
                <div
                  key={idx}
                  className={`img-list-img-container ${
                    activeImg === idx && "img-list-active"
                  }`}
                  onMouseOver={() => setActiveImg(idx)}
                >
                  <img src={img.url} />
                </div>
              );
            })}
          </div>
          <div className="product-active-img-wrapper">
            {product.images.map((img, idx) => {
              return (
                <div
                  key={idx}
                  className={`product-active-img-container ${
                    activeImg === idx && "main-img-active"
                  }`}
                >
                  <img src={img.url} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="product-middle-wrapper">
          <div className="product-title">
            <h1>{product.title}</h1>
          </div>
          <div className="product-rating-container">
            <div className="product-star-rating">
              
            </div>
          </div>
        </div>
        <div className="product-right-wrapper">
          <div className="product-buy-box">
            <div className="buy-box-price">
              <span className="buy-box-price-symbol">$</span>
              <span className="buy-box-price-whole">
                {Math.floor(product.price)}
              </span>
              <span className="buy-box-price-decimal">
                {
                  (
                    Math.round(
                      100 * (product.price - Math.floor(product.price))
                    ) / 100
                  )
                    .toString()
                    .split(".")[1]
                }
              </span>
            </div>
            <div className="buy-box-delivery-time">
              <span>FREE delivery </span>
              <span className="buy-box-date">
                {monthThree} {dayThree} -{" "}
                {monthThree !== monthFive && monthFive} {dayFive}
              </span>
              <span>.</span>
            </div>
            <div className="buy-box-delivery-location">
              <img src={locationpin} />
              {userId && (
                <span>
                  Deliver to {addresses && addresses[0]?.city}{" "}
                  {addresses && addresses[0]?.zipcode}
                </span>
              )}
              {!userId && <span>Sign in to see delivery location</span>}
            </div>
            <div className="buy-box-stock">
              <p>In Stock.</p>
            </div>
            <div className="buy-box-quantity"></div>
            <div className="buy-box-addtocart buy-box-button">Add to Cart</div>
            <div className="buy-box-buynow buy-box-button">Buy Now</div>
            <div className="buy-box-secure">
              <img src={lock} />
              <span>Secure Transaction</span>
            </div>
            <div className="buy-box-ship-sold">
              <div className="buy-box-ship-from">
                <p className="buy-box-grey-text">Ships From</p>
                <p className="ship-sold-location">Amazon.com</p>
              </div>
              <div className="buy-box-sold-by">
                <p className="buy-box-grey-text">Sold By</p>
                <p className="ship-sold-location">Amazon.com</p>
              </div>
            </div>
            <div className="buy-box-return-policy">
              <p>
                Return Policy:<span> Returnable until Jan 31, 2023</span>
              </p>
            </div>
          </div>
        </div>

        {/* <h1>Product Page</h1>
      <p>{product.description}</p>
      <p>{product.fulfilledBy}</p>
      <p>{product.images[0].url}</p>
      <p>{product.price}</p>
      <p>{product.quantity}</p>
      <p>{product.rating}</p>
      <p>{product.reviewCount}</p>
      <p>{product.salePrice}</p>
      <p>{product.seller.firstName}</p>
      <p>{product.sellerId}</p>
      <p>{product.shippingPrice}</p>
      <p>{product.title}</p>

      <div className="product-reviews-container">
        <div className="prudct-reviews-button-container">
          <button onClick={() => createReview()}>Create a Review</button>
        </div>
        {reviews.map((review, ind) => {
          console.log(review.id);
          return (
            <div key={ind}>
              <Review review={review} />
            </div>
          );
        })}
      </div> */}
      </div>
    </div>
  );
}

export default Product;
