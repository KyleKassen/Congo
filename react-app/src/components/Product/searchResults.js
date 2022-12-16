import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./searchResults.css";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchDisplayTerm, setSearchDisplayTerm] = useState("");

  const history = useHistory();
  const location = useLocation();
  let url = new URL(window.location.href);

  const searchParams = url.searchParams;

  const category = searchParams.get("category")
    ? searchParams.get("category")
    : "All";
  const searchInput = searchParams.get("input");


  let getProducts = async () => {
    let response = await fetch(
      `/api/products/lookup?search=${searchInput}&category=${category}`
    );
    let resultingProducts = await response.json();
    setProducts([...resultingProducts.products]);
    setCurrentProducts([...resultingProducts.products])
    setLoaded(true);
  };

  useEffect(() => {
    if (category == "All" && !searchInput) setSearchDisplayTerm(`All Departments`);
    getProducts();

    if (!searchInput && category != "All")
      setSearchDisplayTerm(`Department: ${category}`);
    if (searchInput) setSearchDisplayTerm(searchInput);
  }, [location]);

  const getStars = (rating, addon) => {
    return (
      <>
        {rating > 4.6 && (
          <i className={`stars-img product-5-stars${addon}`}></i>
        )}
        {rating <= 4.6 && rating > 4 && (
          <i className={`stars-img product-45-stars${addon}`}></i>
        )}
        {rating <= 4 && rating > 3.6 && (
          <i className={`stars-img product-4-stars${addon}`}></i>
        )}
        {rating <= 3.6 && rating > 3 && (
          <i className={`stars-img product-35-stars${addon}`}></i>
        )}
        {rating <= 3 && rating > 2.6 && (
          <i className={`stars-img product-3-stars${addon}`}></i>
        )}
        {rating <= 2.6 && rating > 2 && (
          <i className={`stars-img product-25-stars${addon}`}></i>
        )}
        {rating <= 2 && rating > 1.6 && (
          <i className={`stars-img product-2-stars${addon}`}></i>
        )}
        {rating <= 1.6 && rating > 1 && (
          <i className={`stars-img product-15-stars${addon}`}></i>
        )}
        {rating <= 1 && rating > 0.6 && (
          <i className={`stars-img product-1-stars${addon}`}></i>
        )}
        {rating <= 0.6 && rating != null && (
          <i className={`stars-img product-05-stars${addon}`}></i>
        )}
        {rating == null && (
          <i className={`stars-img product-0-stars${addon}`}></i>
        )}
      </>
    );
  };

  // -----------------------------------------------------------------
  // Dealing with delivery times and such vvvvvvvvvvvvvvvvvvvvvvvvvvvv
  let objToday = new Date();
  let objTodayThree = new Date();
  objTodayThree.setDate(objTodayThree.getDate() + 3);

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const todayDay = objToday.getDate();
  const todayWeekDay = days[objToday.getDay()];
  const todayMonth = months[objToday.getMonth()];
  const todayYear = objToday.getFullYear();
  const weekDayThree = days[objTodayThree.getDay()];
  const monthThree = months[objTodayThree.getMonth()];
  const dayThree = objTodayThree.getDate();
  // Dealing with delivery times and such ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // Dealing with star clicks vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  const handleStarClick = rating => {
    const currentProducts = products;
    const result = []
    currentProducts.forEach(prod => {
      if (prod.rating >= rating) result.push(prod)
    })
    setCurrentProducts([...result])
  }

  // Dealing with star clicks ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -----------------------------------------------------------------

  return (
    <>
      {loaded && (
        <div className="search-outer-container">
          <div className="search-container">
            <div className="search-header-container">
              {currentProducts.length == 1 && (
                <p>
                  {currentProducts.length} result for{" "}
                  <span>"{searchDisplayTerm}"</span>
                </p>
              )}
              {currentProducts.length != 1 && (
                <p>
                  {currentProducts.length} results for{" "}
                  <span>"{searchDisplayTerm}"</span>
                </p>
              )}
            </div>
            <div className="search-bottom-section-container">
              <div className="search-bottom-inner-container">
                <div className="search-left-container">
                  <div className="search-review-selection">
                    <p>Customer Reviews</p>
                    <div className="star-rating-div" onClick={() => handleStarClick(4)}>
                      <i className="search-4-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                    <div className="star-rating-div" onClick={() => handleStarClick(3)}>
                      <i className="search-3-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                    <div className="star-rating-div" onClick={() => handleStarClick(2)}>
                      <i className="search-2-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                    <div className="star-rating-div" onClick={() => handleStarClick(1)}>
                      <i className="search-1-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                  </div>
                </div>
                <div className="search-right-container">
                  <div className="search-results-heading">
                    <h2>RESULTS</h2>
                  </div>
                  <div className="search-products-container">
                    {currentProducts.map((product, idx) => {

                      return (
                        <div key={idx} className="search-product-container">
                          <div className="search-product-left-container">
                            <div className="product-img-container" onClick={() => history.push(`/product/${product.id}`)}>
                              <img src={product.images[0].url} />
                            </div>
                          </div>
                          <div className="search-product-right-container">
                            <div className="search-product-title-container">
                              <p onClick={() => history.push(`/product/${product.id}`)}>{product.title}</p>
                            </div>
                            <div className="search-product-rating-container">
                              <div className="product-star-rating">
                                {getStars(product.rating, "")}
                              </div>
                              <span>{product.reviewCount}</span>
                            </div>
                            <div className="search-product-price">
                              <span className="search-product-price-symbol">
                                $
                              </span>
                              <span className="search-product-price-whole">
                                {Math.floor(product.price)}
                              </span>
                              <span className="search-product-price-decimal">
                                {
                                  (
                                    Math.round(
                                      100 *
                                        (product.price -
                                          Math.floor(product.price))
                                    ) / 100
                                  )
                                    .toString()
                                    .split(".")[1]
                                }
                              </span>
                            </div>
                            <div className="product-middle-prime">
                              {product.prime && <i></i>}
                            </div>
                            <div className="search-product-delivery-container">
                              <p>
                                FREE deliver{" "}
                                <span>
                                  {weekDayThree}, {monthThree} {dayThree}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchResults;
