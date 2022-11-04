import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOneReview } from "../../../store/review";
import { addOneProduct } from "../../../store/product";
import "./productform.css";

function ProductForm({createProduct}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);


  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      description,
      price,
    //   prime: true,
    //   quantity: 100,
    //   sold_by: 'Amazon.com',
    //   fulfilled_by: 'Amazon.com',
    };
    let productId = 0
    try {
        const response = await dispatch(addOneProduct(newProduct));
        console.log('Product response from server', response)
        productId = response.id
    } catch (res) {
        console.log(res);
        console.log("Error IN Product Form Response")
    }

    history.push(`/product/${productId}`);
  };

  return (
    <div className="product-form-wrapper">
      <div className="product-form-container">
        {createProduct && <h2>Create Product</h2>}
        {!createProduct && <h2>Edit Product</h2>}
        <form onSubmit={handleSubmit}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="product-form-title-container">
            <h3>Title</h3>
            <input
              id="form-field-title"
              className="form-field"
              placeholder="What is your product?"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <hr />
          <div className="product-form-description-container">
            <h3>Description</h3>
            <textarea
              id="form-field-body"
              className="form-field"
              placeholder="What best describes your product?"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <hr />
          <div className="product-form-price-container">
            <h3>Price</h3>
            <input
              id="form-field-title"
              className="form-field"
              placeholder="What is your product?"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <hr />
          <button
            id="product-form-button"
            className="button button-submit"
            type="submit"
            disabled={errors.length}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
