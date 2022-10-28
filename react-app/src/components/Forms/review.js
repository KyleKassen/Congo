import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Review({setShowModal}) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([])

  const userId = useSelector((state) => state.session.user.id);

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(title)
    console.log(review)
    console.log(rating)
    setShowModal(false)
  }

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

export default Review;
