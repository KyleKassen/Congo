import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOneReview, loadAllReviews } from "../../../store/review";
import selectstar from "../../../media/images/selectstar.svg";
import unselectstar from "../../../media/images/unselectstar.svg";
import plus from "../../../media/images/plusicon.svg";
import "./editreview.css";

function EditReview({ setShowEditReviewModal, editReviewId }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [startingUrls, setStartingUrls] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errormsgs, setErrorMsgs] = useState({});

  const { productId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);
  const product = useSelector((state) => state.products.allProducts[productId]);
  const reviewToEdit = useSelector(
    (state) => state.reviews.productReviews[editReviewId]
  );

  const productTitle =
    product.title.length > 95 ? `${product.title.slice(95)}...` : product.title;

  useEffect(() => {}, [title, review, rating]);

  useEffect(() => {
    let currImageUrls = [];
    for (let image of reviewToEdit.images) {
      currImageUrls.push(image.url);
    }
    setTitle(reviewToEdit.title);
    setReview(reviewToEdit.review);
    setRating(reviewToEdit.rating);
    setImageUrls([...currImageUrls]);
    setStartingUrls([...currImageUrls]);

    handleStarClick(reviewToEdit.rating);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    function textFold(input, lineSize) {
      const output = []
      let outputCharCount = 0
      let outputCharsInCurrentLine = 0
      for (var i = 0; i < input.length; i++) {
        const inputChar = input[i]
        output[outputCharCount++] = inputChar
        if (inputChar === '\n') {
          outputCharsInCurrentLine = 0
        } else if (outputCharsInCurrentLine > lineSize-2) {
          output[outputCharCount++] = '\n'
          outputCharsInCurrentLine = 0
        } else {
          outputCharsInCurrentLine++
        }
      }
      return output.join('')
    }
    // let newTitle = textFold(title, 38)
    // let updateReview = textFold(review, 48)

    let newTitle = textFold(title, 48)
    let updateReview= textFold(review, 48)

    let titleChar = newTitle.replaceAll("\n", "")
    let reviewChar = updateReview.replaceAll("\n", "")

    const newReview = {
      product_id: productId,
      title: newTitle,
      review: updateReview,
      rating: rating,
    };

    let currentErrors = {}

    if (!title.trim()) currentErrors['title'] = "Please enter your headline"
    if (titleChar.length > 255) currentErrors['title'] = "Maximum headline length is 255 characters"
    if (!rating) currentErrors['rating'] = "Please select a star rating"
    if (!review.trim()) currentErrors['review'] = "Please enter your review"
    if (reviewChar.length > 5000) currentErrors['review'] = "Maximum review length is 5000 characters"

    if (Object.values(currentErrors).length > 0) {
      setErrorMsgs(currentErrors)
      return;
    }

    try {
      const response = await dispatch(updateOneReview(newReview, editReviewId));

      if (response.id) {
        const newImageUrls = imageUrls.filter(url => !startingUrls.includes(url));

        const res = await fetch(`/api/reviews/${response.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls: newImageUrls }),
        });
        if (res.ok) {
          await res.json();
          setImageLoading(false);
        } else {
          setImageLoading(false);

        }
      }
    } catch (res) {

    }

    for (let url of imagesToDelete) {
      const deleteRes = await fetch("/api/reviews/images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

    }

    await dispatch(loadAllReviews(productId))
    setShowEditReviewModal(false)
    history.push(`/product/${productId}`);
  };

  useEffect(async () => {

    const formData = new FormData();
    formData.append("image", image);

    if (image) {
      const res = await fetch(`/api/reviews/images`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const urlObj = await res.json();

        const url = urlObj.url;
        setImageUrls([...imageUrls, url]);
      }

      setImage(null);
    }
  }, [image]);

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
    document.getElementById("create-review-img-upload-input").click();
  };

  const deleteImage = async (imageIndex) => {
    const url = imageUrls[imageIndex];

    setImagesToDelete([...imagesToDelete, url]);
    const imagesArray = [...imageUrls];
    imagesArray.splice(imageIndex, 1);
    setImageUrls(imagesArray);

  };



  return (
    <div className="create-review-wrapper">
      <div className="edit-review-container">
        <h2>Edit Review</h2>
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
        {errormsgs.rating && (
              <div className="review-form-error-container">
                <i className="review-form-error-icon"></i>
                <p className="review-form-error-text"> {errormsgs.rating}</p>
              </div>
              )}
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
            />
          </div>
          {errormsgs.title && (
              <div className="review-form-error-container">
                <i className="review-form-error-icon"></i>
                <p className="review-form-error-text"> {errormsgs.title}</p>
              </div>
              )}
          <hr />
          <div className="create-review-img-upload-container">
            <h3>Add a photo or video</h3>
            <p>Shoppers find images more helpful than text alone.</p>
            <input
              id="create-review-img-upload-input"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <div className="create-review-images-section-container">
              {imageUrls.length > 0 &&
                imageUrls.map((url, idx) => {
                  return (
                    <div
                      key={idx}
                      className="create-review-uploaded-image-container"
                    >
                      <div
                        className="create-review-uploaded-image-delete-button"
                        onClick={() => deleteImage(idx)}
                      >
                        <i></i>
                      </div>
                      <img src={url} />
                    </div>
                  );
                })}
              <div
                className="create-review-img-upload-button"
                onClick={() => addImgClicked()}
              >
                <img src={plus} />
              </div>
            </div>
          </div>
          <hr className="create-review-img-body-divider" />
          <div className="create-review-body-container">
            <h3>Add a written review</h3>
            <textarea
              id="form-field-body"
              className="form-field"
              placeholder="What did you like or dislike? What did you use this product for?"
              type="textarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          {errormsgs.review && (
              <div className="review-form-error-container">
                <i className="review-form-error-icon"></i>
                <p className="review-form-error-text"> {errormsgs.review}</p>
              </div>
              )}
          <div>
            <input
              id="form-field-rating"
              className="form-field"
              placeholder="Review Rating"
              type="hidden"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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

export default EditReview;
