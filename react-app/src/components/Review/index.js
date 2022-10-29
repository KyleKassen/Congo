import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditReview from "../Forms/ReviewForms/editReview";
import { deleteOneReview } from "../../store/review";
import { Modal } from "../../context/Modal";

function Review({ review }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch()

  const deleteReview = async () => {
    await dispatch(deleteOneReview(review.id))
    // return null;
  };

  return (
    <>
      <h2>{review.title}</h2>
      <p>{review.review}</p>
      <button onClick={() => deleteReview(review.id)}>delete</button>
      <button onClick={() => setShowModal(true)}>update</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview setShowModal={setShowModal} reviewId={review.id} />
        </Modal>
      )}
    </>
  );
}

export default Review;
