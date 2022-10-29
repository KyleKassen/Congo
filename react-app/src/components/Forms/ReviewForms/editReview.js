import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOneReview } from "../../../store/review";
import { Modal } from "../../../context/Modal";

function EditReview({ showModal, setShowModal, reviewId }) {
  // const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);

  const { productId } = useParams();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);

  console.log(`\n\n${reviewId}\n\n`);

  useEffect(() => {}, [title, review, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(review);
    console.log(rating);

    const updateReview = {
      product_id: productId,
      title: title,
      review: review,
      rating: rating,
    };

    try {
      const response = await dispatch(updateOneReview(updateReview, reviewId));
      console.log(response);
    } catch (res) {
      console.log(res);
      console.log("ERROR IN REVIEW FORM RESPONSE");
    }

    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
        </Modal>
      )}
    </>
  );
}

export default EditReview;
