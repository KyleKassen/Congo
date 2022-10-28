import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOneProduct } from "../../store/product";
import { loadAllReviews } from "../../store/review";

import "./product.css";

function Product() {
  const [loaded, setLoaded] = useState(false);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.singleProduct);
  const reviews = useSelector((state) => Object.values(state.reviews.productReviews));

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

  let updateReview = async (id) => {
    console.log(`update review ${id}`)
    return null
  }

  let deleteReview = async (id) => {
    console.log(`delete review ${id}`)
    return null
  }

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
        {reviews.map((review) => {
          return (
            <>
              <h2>{review.title}</h2>
              <p>{review.review}</p>
              <button onClick={() => deleteReview(review.id)}>delete</button>
              <button onClick={() => updateReview(review.id)}>update</button>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Product;
