import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./searchResults.css";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchDisplayTerm, setSearchDisplayTerm] = useState("")

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
    if (category == "All" && !searchInput) history.push("/")
    getProducts();

    if (!searchInput && category != "All") setSearchDisplayTerm(`Department: ${category}`)
    if (searchInput) setSearchDisplayTerm(searchInput)
  }, [location]);

  return (
    <>
      {loaded && (
        <div className="search-outer-container">
          <div className="search-container">
            <div className="search-header-container">
              {products.length == 1 && (
                <p>
                  {products.length} result for <span>"{searchDisplayTerm}"</span>
                </p>
              )}
              {products.length != 1 && (
                <p>
                  {products.length} results for <span>"{searchDisplayTerm}"</span>
                </p>
              )}
            </div>
            <div className="search-left-container">

            </div>
            <div className="search-right-container">

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchResults;
