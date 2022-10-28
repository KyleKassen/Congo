import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Review() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const userId = useSelector((state) => state.session.user.id);

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
            id="form-field--name"
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
            id="form-field--name"
            className="form-field"
            placeholder="Review Bodye"
            type="text"
            value={Review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            id="form-field--name"
            className="form-field"
            placeholder="Business name"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
      </form>
    </>
  );
}

export default Review;
