import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOneReview } from "../../../store/review";

function EditReview({ setShowModal, reviewId }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);

  const { productId } = useParams();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);


  useEffect(() => {}, [title, review, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateReview = {
      product_id: productId,
      title: title,
      review: review,
      rating: rating,
    };

    try {
      const response = await dispatch(updateOneReview(updateReview, reviewId));
    } catch (res) {

    }

    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            id="form-field-title"
            className="form-field"
            placeholder="Review Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            id="form-field-body"
            className="form-field"
            placeholder="Review Body"
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            id="form-field-rating"
            className="form-field"
            placeholder="Review Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <button
          id="update-review-button"
          className="button button-submit"
          type="submit"
          disabled={errors.length}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default EditReview;
