import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./searchResults.css";

function SearchResults() {
  const [products, setProducts] = useState([]);
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
  console.log(category);
  console.log(searchInput);

  let getProducts = async () => {
    let response = await fetch(
      `/api/products/lookup?search=${searchInput}&category=${category}`
    );
    let resultingProducts = await response.json();
    setProducts([...resultingProducts.products]);
    setLoaded(true);
  };

  useEffect(() => {
    if (category == "All" && !searchInput) history.push("/");
    getProducts();

    if (!searchInput && category != "All")
      setSearchDisplayTerm(`Department: ${category}`);
    if (searchInput) setSearchDisplayTerm(searchInput);
  }, [location]);

  return (
    <>
      {loaded && (
        <div className="search-outer-container">
          <div className="search-container">
            <div className="search-header-container">
              {products.length == 1 && (
                <p>
                  {products.length} result for{" "}
                  <span>"{searchDisplayTerm}"</span>
                </p>
              )}
              {products.length != 1 && (
                <p>
                  {products.length} results for{" "}
                  <span>"{searchDisplayTerm}"</span>
                </p>
              )}
            </div>
            <div className="search-bottom-section-container">
              <div className="search-bottom-inner-container">
                <div className="search-left-container">
                  <div className="search-review-selection">
                    <p>Customer Reviews</p>
                    <div className="star-rating-div">
                      <i className="search-4-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                    <div className="star-rating-div">
                      <i className="search-3-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                    <div className="star-rating-div">
                      <i className="search-2-star-icon star-icons"></i>
                      <span>& Up</span>
                    </div>
                    <div className="star-rating-div">
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
                    {products.map((product, idx) => {
                        console.log(product)
                      return (
                        <div key={idx} className="search-product-container">
                          <div className="search-product-left-container">
                            <div className="product-img-container">
                              <img src={product.images[0].url} />
                            </div>
                          </div>
                          <div className="search-product-right-container">
                            <div className="search-product-title-container">
                                <p>{product.title}</p>
                            </div>
                            <div className="search-product-rating-container">
                                <i></i>
                                <span></span>
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
