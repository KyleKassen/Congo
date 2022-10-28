import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import congo from "../../media/images/CONGO.png";
import locationPin from "../../media/icons/locationPin.png";
import darkpin from "../../media/images/darkpin.png";
import whitepin from "../../media/images/whitepin.png";
import hamburger from "../../media/images/hamburger.png";
import cart from "../../media/images/cart.png";
import flag from "../../media/icons/flag.png";
import "./header.css";

function Header() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [submitted, isSubmitted] = useState(false);
  const [focusClass, setFocusClass] = useState("");
  const history = useHistory();

  const session = useSelector(state => state.session)

  const departments = ["All", "Amazon", "Appliances", "Clothing"];
  const mainNav = [
    "Best Sellers",
    "Amazon Basics",
    "Customer Service",
    "Today's Deals",
    "Prime",
    "New Releases",
    "Music",
    "Books",
    "Pharmacy",
    "Registry",
    "Amazon Home",
    "Fashion",
    "Kindle Books",
    "Gift Cards",
    "Toys & Games",
    "Sell",
    "Coupons",
    "Automotive",
    "Amazon Explore",
    "Computers",
    "Home Improvement",
    "Beauty & Personal Care",
    "Video Games",
    "Pet Supplies",
    "Health & Household",
    "Luxury Stores",
    "Smart Home",
    "Handmade",
    "Audible"
  ];

  async function onSubmit(e) {
    e.preventDefault();

    history.push(`businesses/search?input=${search}`);
  }

  return (
    <div>
      <div className="header-outer-container">
        <div className="header-left-container">
          <div className="header-logo header-hover-border">
            <img src={congo} />
          </div>
          <div className="header-set-location header-hover-border">
            <img src={whitepin} />
            <div>
              <p className="header-top-text">Deliver to</p>
              <p className="header-bottom-text">Select your address</p>
            </div>
          </div>
        </div>
        <div className={`header-middle-container ${focusClass}`}>
          <div className="header-search-bar-outer-container">
            <form onSubmit={onSubmit} className="text">
              <div className="header-search-bar-container">
                <select
                  className="header-search-bar-category-dropdown"
                  type="text"
                  name="department"
                  placeholder="All"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments.map((department) => (
                    <option value={department}>{department}</option>
                  ))}
                </select>
                <input
                  className="header-search-input-field"
                  type="text"
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onBlur={() => setFocusClass("")}
                  onFocus={() =>
                    setFocusClass("header-middle-container-border")
                  }
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
          <div className="header-language header-hover-border">
            <img src={flag} />
            EN
          </div>
          <div className="header-user-auth header-hover-border" onClick={() => history.push('/login')}>
            {!session.user && <p className="header-top-text">Hello, sign in</p>}
            {session.user && <p className="header-top-text">Hello, {session.user.firstName}</p>}
            <p className="header-bottom-text">Account & Lists</p>
          </div>
          <div className="header-returns header-hover-border">
            <p className="header-top-text">Returns</p>
            <p className="header-bottom-text">& Orders</p>
          </div>
          <div className="header-cart header-hover-border">
            <div className="header-cart-counter-container">
              <span>0</span>
            </div>
            <img src={cart} />
            <p className="header-bottom-text">Cart</p>
          </div>
        </div>
      </div>
      <div className="header-mainnav-container">
        <div className="header-mainnav-all header-hover-border">
          <div className="header-mainnav-all-img-container">
            <img src={hamburger} />
          </div>
          <p>All</p>
        </div>
        {mainNav.map((navItem) => {
          let navItem2 = navItem.slice(0,3).toLowerCase()
          if(navItem === "Amazon Basics") navItem2 = "bas"
          else if(navItem === "Amazon Explore") navItem2 = "exp"
          else if(navItem === "Amazon Home") navItem2= "ho2"
          return (
            <div className={`header-mainnav-item-container header-mainnav-${navItem2}`}>
              <p className="header-mainnav-item header-hover-border">
                {navItem}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
