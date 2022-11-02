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
  // const [fiveStarCount, setFiveStarCount] = useState(0)
  // const [fourStarCount, setFourStarCount] = useState(0)
  // const [threeStarCount, setThreeStarCount] = useState(0)
  // const [twoStarCount, setTwoStarCount] = useState(0)
  // const [oneStarCount, setOneStarCount] = useState(0)
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

      // for (let review of reviews) {
      //   switch (review.rating) {
      //     case 5:
      //       setFiveStarCount(fiveStarCount + 1)
      //     case 4:
      //       setFourStarCount(fourStarCount + 1)
      //     case 3:
      //       setThreeStarCount(threeStarCount + 1)
      //     case 2:
      //       setTwoStarCount(twoStarCount + 1)
      //     case 1:
      //       setOneStarCount(oneStarCount + 1)
      //   }
      // }
    })();
  }, [dispatch]);

  let five = 0;
  let four = 0;
  let three = 0;
  let two = 0;
  let one = 0;
  for (let review of reviews) {
    console.log("review.rating is", review.rating);
    switch (review.rating) {
      case 5:
        five += 1;
        break;
      case 4:
        four += 1;
        break;
      case 3:
        three += 1;
        break;
      case 2:
        two += 1;
        break;
      case 1:
        one += 1;
        break;
    }
  }

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

  const getStars = (addon) => {
    return (
      <>
        {product.rating > 4.6 && <i className="stars-img product-5-stars"></i>}
        {product.rating <= 4.6 && product.rating > 4 && (
          <i className={`stars-img product-45-stars${addon}`}></i>
        )}
        {product.rating <= 4 && product.rating > 3.6 && (
          <i className={`stars-img product-4-stars${addon}`}></i>
        )}
        {product.rating <= 3.6 && product.rating > 3 && (
          <i className={`stars-img product-35-stars${addon}`}></i>
        )}
        {product.rating <= 3 && product.rating > 2.6 && (
          <i className={`stars-img product-3-stars${addon}`}></i>
        )}
        {product.rating <= 2.6 && product.rating > 2 && (
          <i className={`stars-img product-25-stars${addon}`}></i>
        )}
        {product.rating <= 2 && product.rating > 1.6 && (
          <i className={`stars-img product-2-stars${addon}`}></i>
        )}
        {product.rating <= 1.6 && product.rating > 1 && (
          <i className={`stars-img product-15-stars${addon}`}></i>
        )}
        {product.rating <= 1 && product.rating > 0.6 && (
          <i className={`stars-img product-1-stars${addon}`}></i>
        )}
        {product.rating <= 0.6 && (
          <i className={`stars-img product-05-stars${addon}`}></i>
        )}
        {product.rating == null && (
          <i className={`stars-img product-0-stars${addon}`}></i>
        )}
      </>
    );
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
            <div className="product-star-rating">{getStars("")}</div>
            <div className="product-rating-count">
              <span>{product.reviewCount} ratings</span>
            </div>
          </div>
          <hr />
          <div className="product-middle-price">
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
          <div className="product-middle-prime">{product.prime && <i></i>}</div>
          <div className="product-middle-free-returns">
            <span>Free Returns</span>
          </div>
          <div className="product-middle-msg">
            <p>
              May be available at a lower price from other sellers, potentially
              without free Prime shipping.
            </p>
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
      <div className="product-description">
        <hr className="product-divider" />
        <h2>Product Description</h2>
        <p>{product.description}</p>
      </div>
      <div className="product-review-container">
        <div className="product-review-left-container">
          <h2>Customer reviews</h2>
          <div className="product-review-star-text">
            <div className="product-review-rating">{getStars("big")}</div>
            <p>{product.rating} out of 5</p>
          </div>
          <span className="product-review-total-ratings">
            {product.reviewCount} global ratings
          </span>
          <div className="review-table-container">
            <tbody className="review-table-stars">
              <tr className="review-table-5star">
                <td className="review-table-star-text review-table-5star-text">
                  <span>5 star</span>
                </td>
                <td className="review-table-5star-bar">
                  <div className="review-table-bar 5star-bar">
                    <div
                      className="review-table-bar-filled 5star-bar-filled"
                      style={{
                        width: `${Math.floor((five / reviews.length) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-5star-percent">
                  {Math.floor((five / reviews.length) * 100)}%
                </td>
              </tr>
              <tr className="review-table-4star">
                <td className="review-table-star-text review-table-4star-text">
                  <span>4 star</span>
                </td>
                <td className="review-table-4star-bar">
                  <div className="review-table-bar 4star-bar">
                    <div
                      className="review-table-bar-filled 4star-bar-filled"
                      style={{
                        width: `${Math.floor((four / reviews.length) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-4star-percent">
                  {Math.floor((four / reviews.length) * 100)}%
                </td>
              </tr>
              <tr className="review-table-3star">
                <td className="review-table-star-text review-table-3star-text">
                  <span>3 star</span>
                </td>
                <td className="review-table-3star-bar">
                  <div className="review-table-bar 3star-bar">
                    <div
                      className="review-table-bar-filled 3star-bar-filled"
                      style={{
                        width: `${Math.floor((three / reviews.length) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-3star-percent">
                  {Math.floor((three / reviews.length) * 100)}%
                </td>
              </tr>
              <tr className="review-table-2star">
                <td className="review-table-star-text review-table-2star-text">
                  <span>2 star</span>
                </td>
                <td className="review-table-2star-bar">
                  <div className="review-table-bar 2star-bar">
                    <div
                      className="review-table-bar-filled 2star-bar-filled"
                      style={{
                        width: `${Math.floor((two / reviews.length) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-2star-percent">
                  {Math.floor((two / reviews.length) * 100)}%
                </td>
              </tr>
              <tr className="review-table-1star">
                <td className="review-table-star-text review-table-1star-text">
                  <span>1 star</span>
                </td>
                <td className="review-table-1star-bar">
                  <div className="review-table-bar 1star-bar">
                    <div
                      className="review-table-bar-filled 1star-bar-filled"
                      style={{
                        width: `${Math.floor((one / reviews.length) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-1star-percent">
                  {Math.floor((one / reviews.length) * 100)}%
                </td>
              </tr>
            </tbody>
          </div>
          <div>
            <hr className="review-left-divider"/>
          </div>
          <div className="review-create-section">
            <h3>Review this product</h3>
            <p>Share your thoughts with other customers</p>
            <button>Write a customer review</button>
          </div>
          <div>
            <hr className="review-left-divider"/>
          </div>
        </div>
        <div className="review-right-container"></div>
      </div>
    </div>
  );
}

export default Product;
