import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOneProduct, updateOneProduct } from "../../../store/product";
import "./productform.css";

function ProductForm({ createProduct }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [errormsgs, setErrorMsgs] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const currentProduct = useSelector(
    (state) => state.products.allProducts[productId]
  );

  let userId;

  if (!user) {
    history.push('/productId')
    history.push('/login')
  } else {
    userId = user.id
  }

  useEffect(() => {
    if (!createProduct) {
      setTitle(currentProduct.title);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      setImage(currentProduct.images[0].url);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentErrors = {};

    if (!title.trim()) currentErrors["title"] = "Please enter your title";
    if (title.length > 255)
      currentErrors["title"] = "Maximum title length is 255 characters";
    if (!description.trim())
      currentErrors["description"] = "Please enter a description";
    if (!price) currentErrors["price"] = "Please enter a price";
    if (price < 0) currentErrors["price"] = "Price must be a postive value";
    if (image.match(/\.(jpeg|jpg|gif|png)$/) == null) currentErrors["image"] = "Invalid URL"
    if (!image.trim()) currentErrors["image"] = "Please enter an image URL"
    if (parseInt(price) > 1000000)
      currentErrors["price"] = "Price must be below $1,000,000";
    console.log(`price is ${typeof price}`);

    if (Object.values(currentErrors).length > 0) {
      setErrorMsgs(currentErrors);
      return;
    }

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
    let newTitle = textFold(title, 50)
    let newDescription = textFold(description, 99)

    const newProduct = {
      title: newTitle,
      description: newDescription,
      price,
      image
      //   prime: true,
      //   quantity: 100,
      //   sold_by: 'Amazon.com',
      //   fulfilled_by: 'Amazon.com',
    };

    if (createProduct) {
      let productId = 0;
      try {
        const response = await dispatch(addOneProduct(newProduct));
        console.log("Product response from server", response);
        productId = response.id;
      } catch (res) {
        console.log(res);
        console.log("Error IN Product Form Response");
      }
      history.push(`/product/${productId}`);
    } else {
      try {
        const response = await dispatch(
          updateOneProduct(newProduct, productId)
        );
        console.log("Product response from server", response);
      } catch (res) {
        console.log(res);
        console.log("Error IN Product Form Response");
      }

      history.push(`/product/${productId}`);
    }
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
            />
          </div>
          {errormsgs.title && (
            <div className="product-form-error-container">
              <i className="product-form-error-icon"></i>
              <p className="product-form-error-text"> {errormsgs.title}</p>
            </div>
          )}
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
            ></textarea>
          </div>
          {errormsgs.description && (
            <div className="product-form-error-container">
              <i className="product-form-error-icon"></i>
              <p className="product-form-error-text">
                {" "}
                {errormsgs.description}
              </p>
            </div>
          )}
          <hr />
          <div className="product-form-price-container">
            <h3>Price</h3>
            <input
              id="form-field-price"
              className="form-field"
              placeholder="How much do you want to sell your product for?"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {errormsgs.price && (
            <div className="product-form-error-container">
              <i className="product-form-error-icon"></i>
              <p className="product-form-error-text"> {errormsgs.price}</p>
            </div>
          )}
          <hr />
          <div className="product-form-title-container">
            <h3>Image</h3>
            <input
              id="form-field-title"
              className="form-field"
              placeholder="Please enter the an image URL"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {errormsgs.image && (
            <div className="product-form-error-container">
              <i className="product-form-error-icon"></i>
              <p className="product-form-error-text"> {errormsgs.image}</p>
            </div>
          )}
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
