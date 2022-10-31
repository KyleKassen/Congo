import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOneProduct } from "../../store/product";
import { loadAllReviews } from "../../store/review";
import EditReview from "../Forms/ReviewForms/editReview";
import Review from "../Review/index";

import "./product.css";

function Product() {
  const [loaded, setLoaded] = useState(false);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.products.singleProduct);
  const reviews = useSelector((state) =>
    Object.values(state.reviews.productReviews)
  );

  useEffect(() => {
    (async () => {
      await dispatch(loadOneProduct(productId));
      await dispatch(loadAllReviews(productId));
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  let createReview = async () => {
    history.push(`/product/${productId}/create`);
  };

  return (
    <>
      <h1>Product Page</h1>
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
      </div>
    </>
  );
}

export default Product;
