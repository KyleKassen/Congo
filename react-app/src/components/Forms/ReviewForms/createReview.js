import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOneReview } from "../../../store/review";
import selectstar from "../../../media/images/selectstar.svg";
import unselectstar from "../../../media/images/unselectstar.svg";
import plus from "../../../media/images/plusicon.svg";
import "./createreview.css";

function CreateReview() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { productId } = useParams();
  console.log(`productId is ${productId}`);

  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);
  const product = useSelector((state) => state.products.allProducts[productId]);

  const productTitle =
    product.title.length > 95 ? `${product.title.slice(95)}...` : product.title;

  useEffect(() => {}, [title, review, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(review);
    console.log(rating);

    const formData = new FormData();
    formData.append("image", image);

    const newReview = {
      product_id: productId,
      title: title,
      review: review,
      rating: rating,
    };

    // let response = null
    try {
      const response = await dispatch(createOneReview(newReview, productId));
      console.log(response);
      if (response.id) {
        console.log('review posted correctly', response.id)
        const res = await fetch(`/api/reviews/${response.id}/images`, {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          await res.json();
          setImageLoading(false);
          // history.push("/images");
        } else {
          setImageLoading(false);
          // a real app would probably use more advanced
          // error handling
          console.log("error");
        }
      }
    } catch (res) {
      console.log(res);
      console.log("ERROR IN REVIEW FORM RESPONSE");
    }

    // history.push(`/product/${productId}`);
  };

  const handleStarClick = (starNumber) => {
    let starOne = document.getElementsByClassName("create-review-star1")[0]
      .firstChild;
    let starTwo = document.getElementsByClassName("create-review-star2")[0]
      .firstChild;
    let starThree = document.getElementsByClassName("create-review-star3")[0]
      .firstChild;
    let starFour = document.getElementsByClassName("create-review-star4")[0]
      .firstChild;
    let starFive = document.getElementsByClassName("create-review-star5")[0]
      .firstChild;

    if (starNumber === 0) {
      starOne.src = unselectstar;
      starTwo.src = unselectstar;
      starThree.src = unselectstar;
      starFour.src = unselectstar;
      starFive.src = unselectstar;
      setRating(0);
      return;
    }

    starOne.src = selectstar;
    if (starNumber === 1) {
      starTwo.src = unselectstar;
      starThree.src = unselectstar;
      starFour.src = unselectstar;
      starFive.src = unselectstar;
      setRating(1);
      return;
    }
    starTwo.src = selectstar;
    if (starNumber === 2) {
      starThree.src = unselectstar;
      starFour.src = unselectstar;
      starFive.src = unselectstar;
      setRating(2);
      return;
    }
    starThree.src = selectstar;
    if (starNumber === 3) {
      starFour.src = unselectstar;
      starFive.src = unselectstar;
      setRating(3);
      return;
    }
    starFour.src = selectstar;
    if (starNumber === 4) {
      starFive.src = unselectstar;
      setRating(4);
      return;
    }
    starFive.src = selectstar;
    setRating(5);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const addImgClicked = () => {
    document.getElementsByClassName('create-review-img-upload-container')[0]?.firstChild.click();
  }


  return (
    <div className="create-review-wrapper">
      <div className="create-review-container">
        <h2>Create Review</h2>
        <div className="create-review-product-info-container">
          {product?.images[0] && <img src={product.images[0].url} />}
          <p>{productTitle}</p>
        </div>
        <hr />
        <div className="create-review-rating-container">
          <div className="create-review-rating-header-container">
            <h3>Overall rating</h3>
            {rating > 0 && <p onClick={() => handleStarClick(0)}>Clear</p>}
          </div>
          <div className="create-review-rating-stars-container">
            <button
              className="create-review-star1"
              onClick={() => handleStarClick(1)}
            >
              <img id="star1" src={unselectstar} />
            </button>
            <button
              className="create-review-star2"
              onClick={() => handleStarClick(2)}
            >
              <img id="star2" src={unselectstar} />
            </button>
            <button
              className="create-review-star3"
              onClick={() => handleStarClick(3)}
            >
              <img id="starDos" src={unselectstar} />
            </button>
            <button
              className="create-review-star4"
              onClick={() => handleStarClick(4)}
            >
              <img src={unselectstar} />
            </button>
            <button
              className="create-review-star5"
              onClick={() => handleStarClick(5)}
            >
              <img src={unselectstar} />
            </button>
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="create-review-title-container">
            <h3>Add a headline</h3>
            <input
              id="form-field-title"
              className="form-field"
              placeholder="What's most important to know?"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <hr />
          <div className="create-review-img-upload-container">
            <h3>Add a photo or video</h3>
            <p>Shoppers find images more helpful than text alone.</p>
            <input type="file" accept="image/*" onChange={updateImage} />
            <div className="create-review-img-upload-button" onClick={() => addImgClicked()}>
              <img src={plus} />
            </div>
          </div>
          <hr />
          <div className="create-review-body-container">
            <h3>Add a written review</h3>
            <textarea
              id="form-field-body"
              className="form-field"
              placeholder="What did you like or dislike? What did you use this product for?"
              type="textarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <input
              id="form-field-rating"
              className="form-field"
              placeholder="Review Rating"
              type="hidden"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <hr />
          <button
            id="create-review-button"
            className="button button-submit"
            type="submit"
            disabled={errors.length}
          >
            Submit
          </button>
          {imageLoading && <p>Loading...</p>}
        </form>
      </div>
    </div>
  );
}

export default CreateReview;
