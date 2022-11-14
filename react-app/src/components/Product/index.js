import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadOneProduct,
  loadAllProducts,
  deleteOneProduct,
} from "../../store/product";
import { loadAllReviews, deleteOneReview } from "../../store/review";
import { loadAllAddresses } from "../../store/address";
import { Modal } from "../../context/Modal";
import EditReview from "../Forms/ReviewForms/editReview";
import Review from "../Review/index";

import locationpin from "../../media/images/buyboxlocation.png";
import lock from "../../media/images/greyLock.png";
// import threesquares from "../../media/images/threesquares.png";
import threesq from "../../media/images/threesq.svg";

import "./product.css";

function Product() {
  const [loaded, setLoaded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showEditReviewModal, setShowEditReviewModal] = useState(false);
  const [editReviewId, setEditReviewId] = useState(0);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.products.singleProduct);
  const allProductsProduct = useSelector(
    (state) => state.products.allProducts[productId]
  );
  const reviews = useSelector((state) =>
    Object.values(state.reviews.productReviews)
  );
  const addresses = useSelector((state) =>
    Object.values(state.addresses?.addresses)
  );
  const userId = useSelector((state) => state.session.user?.id);

  console.log(`object keys producs ${product}`);

  useEffect(() => {
    (async () => {
      await dispatch(loadOneProduct(productId));
      await dispatch(loadAllProducts(productId));
      await dispatch(loadAllReviews(productId));
      if (userId) {
        {
          await dispatch(loadAllAddresses(userId));
        }
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!allProductsProduct) {
    return (
      <div className="product-page-no-product">
        <h1>No Product Found</h1>
      </div>
    );
  }

  let five = 0;
  let four = 0;
  let three = 0;
  let two = 0;
  let one = 0;
  let reviewImgs = [];
  console.log("refresh happened");
  for (let review of reviews) {
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
      case null:
        break;
    }

    if (review.images) {
      for (let image of review.images) {
        reviewImgs = [...reviewImgs, image];
      }
    }
  }

  if (!loaded) {
    return null;
  }

  let objToday = new Date();
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

  const todayDay = objToday.getDate();
  const todayMonth = months[objToday.getMonth()];
  const todayYear = objToday.getFullYear();
  const monthThree = months[objTodayThree.getMonth()];
  const dayThree = objTodayThree.getDate();
  const monthFive = months[objTodayFive.getMonth()];
  const dayFive = objTodayFive.getDate();

  let createReview = async () => {
    history.push(`/product/${productId}/create`);
  };

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

  const editReview = async (currReview) => {
    return null;
  };

  const deleteReview = async (currReview) => {
    await dispatch(deleteOneReview(currReview.id));
  };

  const deleteProduct = async (id) => {
    await dispatch(deleteOneProduct(id));
    await dispatch(loadAllProducts());
    // history.push(`/product/${productId}`)
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
          <div className="product-rating-edit-container">
            <div className="product-rating-container">
              <div className="product-star-rating">
                {getStars(product.rating, "")}
              </div>
              <div className="product-rating-count">
                <span>{product.reviewCount} ratings</span>
              </div>
            </div>
            <div className="review-edit-delete-dropdown">
              {product.sellerId === userId && <img src={threesq} />}
              <ul>
                <li
                  onClick={() => {
                    history.push(`/editproduct/${product.id}`);
                  }}
                >
                  Edit Product
                </li>
                <li onClick={() => deleteProduct(product.id)}>
                  Delete Product
                </li>
                <div className="review-dropdown-top-buffer"></div>
                <div className="review-dropdown-right-buffer"></div>
                <div className="review-dropdown-bottom-buffer"></div>
                <div className="review-dropdown-left-buffer"></div>
              </ul>
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
              {userId && addresses.length > 0 && (
                <span>
                  Deliver to {addresses && addresses[0]?.city}{" "}
                  {addresses && addresses[0]?.zipcode}
                </span>
              )}
              {!userId && <span>Sign in to see delivery location</span>}
              {addresses.length === 0 && userId && <span>No delivery address found</span>}
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
                <p className="ship-sold-location">Congo.com</p>
              </div>
              <div className="buy-box-sold-by">
                <p className="buy-box-grey-text">Sold By</p>
                <p className="ship-sold-location">Congo.com</p>
              </div>
            </div>
            <div className="buy-box-return-policy">
              <p>
                Return Policy:<span> Returnable until Jan 31, 2023</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-description">
        <hr className="product-divider" />
        <h2>Product Description</h2>
        <p>{product.description}</p>
        <hr className="product-divider" />
      </div>
      <div className="product-review-container">
        <div className="product-review-left-container">
          <h2>Customer reviews</h2>
          <div className="product-review-star-text">
            <div className="product-review-rating">
              {getStars(product.rating, "big")}
            </div>
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
                        width: `${
                          reviews.length &&
                          Math.floor((five / reviews.length) * 100)
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-5star-percent">
                  {reviews.length && Math.floor((five / reviews.length) * 100)}%
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
                        width: `${
                          reviews.length &&
                          Math.floor((four / reviews.length) * 100)
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-4star-percent">
                  {reviews.length && Math.floor((four / reviews.length) * 100)}%
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
                        width: `${
                          reviews.length &&
                          Math.floor((three / reviews.length) * 100)
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-3star-percent">
                  {reviews.length && Math.floor((three / reviews.length) * 100)}
                  %
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
                        width: `${
                          reviews.length &&
                          Math.floor((two / reviews.length) * 100)
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-2star-percent">
                  {reviews.length && Math.floor((two / reviews.length) * 100)}%
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
                        width: `${
                          reviews.length &&
                          Math.floor((one / reviews.length) * 100)
                        }%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="review-table-percent-text review-table-1star-percent">
                  {reviews.length && Math.floor((one / reviews.length) * 100)}%
                </td>
              </tr>
            </tbody>
          </div>
          <div>
            <hr className="review-left-divider" />
          </div>
          {userId !== product.sellerId && (
            <>
              <div className="review-create-section">
                <h3>Review this product</h3>
                <p>Share your thoughts with other customers</p>
                <button onClick={() => createReview()}>
                  Write a customer review
                </button>
              </div>
              <div>
                <hr className="review-left-divider" />
              </div>
            </>
          )}
        </div>
        <div className="review-right-container">
          {reviewImgs.length > 0 && (
            <>
              <h3 className="review-images-heading">Review Images</h3>
              <div className="review-images-container">
                {reviewImgs.map((image, idx) => {
                  if (idx > 3) return null;
                  return <img key={idx} src={image.url} />;
                })}
              </div>
            </>
          )}
          <div className="reviews-content-container">
            {reviewImgs.length > 0 && <h3>From the United States</h3>}
            {reviewImgs.length === 0 && <h3>No reviews for this product</h3>}
            {reviews && (
              <>
                {reviews.map((review, idx) => {
                  if (idx > 10) return null;
                  return (
                    <div key={idx} className="review-single-content-container">
                      <div className="review-user-edit-delete-container">
                        <div className="review-single-user-info-container">
                          <img src={review.user.picture} />
                          <p>{review.user.username}</p>
                        </div>
                        <div className="review-edit-delete-dropdown">
                          {review.userId === userId && <img src={threesq} />}
                          <ul>
                            <li
                              onClick={() => {
                                setShowEditReviewModal(true);
                                setEditReviewId(review.id);
                              }}
                            >
                              Edit Review
                            </li>
                            <li onClick={() => deleteReview(review)}>
                              Delete Review
                            </li>
                            <div className="review-dropdown-top-buffer"></div>
                            <div className="review-dropdown-right-buffer"></div>
                            <div className="review-dropdown-bottom-buffer"></div>
                            <div className="review-dropdown-left-buffer"></div>
                          </ul>
                        </div>
                      </div>
                      <div className="review-single-rating-title-container">
                        <div className="product-star-rating">
                          {getStars(review.rating, "")}
                        </div>
                        <p>{review.title}</p>
                      </div>
                      <p className="review-single-date">
                        Reviewed in the United States on {todayMonth} {todayDay}
                        , {todayYear}
                      </p>
                      <p className="review-single-verified">
                        Verified Purchase
                      </p>
                      <p className="review-single-review">{review.review}</p>
                      {review.images.length > 0 && (
                        <div className="review-single-all-images-container">
                          {review.images.map((image, idx) => {
                            return (
                              <div
                                key={idx}
                                className="review-single-image-container"
                              >
                                <img src={image.url} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* <div className="review-single-helpful-abuse-container">
                        <button>Helpful</button>
                        <i></i>
                        <p>Report abuse</p>
                      </div> */}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {showEditReviewModal && (
        <Modal onClose={() => setShowEditReviewModal(false)}>
          <EditReview
            setShowEditReviewModal={setShowEditReviewModal}
            editReviewId={editReviewId}
          />
        </Modal>
      )}
    </div>
  );
}

export default Product;
