import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import congo from "../../media/images/CONGO.png";
import locationPin from "../../media/icons/locationPin.png";
import flag from "../../media/icons/flag.png";
import "./header.css";

function Header() {
  // const location = useSelector(state => state.)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, isSubmitted] = useState(false);
  const history = useHistory();

  const categories = ["All", "Amazon", "Appliances", "Clothing"];

  async function onSubmit(e) {
    e.preventDefault();

    history.push(`businesses/search?input=${search}`);
  }

  return (
    <div className="header-outer-container">
      <div className="header-left-container">
        <div className="header-logo">
          <img src={congo} />
        </div>
        <div className="header-set-location">Set Location</div>
      </div>
      <div className="header-middle-container">
        <div className="header-search-bar-outer-container">
          <form onSubmit={onSubmit} className="text">
            <div className="header-search-bar-container">
              <select
                className="header-search-bar-category-dropdown"
                type="text"
                name="category"
                placeholder="All"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
              <input
                className="header-search-input-field"
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="header-search-button"
                type="submit"
                disabled={isSubmitted}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="header-right-container">
        <div className="header-language">
          <img src={flag} />
          EN
        </div>
        <div className="header-user-auth">
          <p className="header-user-auth-small">Hello, sign in</p>
          <p className="header-user-auth-large">Account & Lists</p>
        </div>
        <div className="header-returns">returns</div>
        <div className="header-cart">cart button</div>
      </div>
    </div>
  );
}

export default Header;
