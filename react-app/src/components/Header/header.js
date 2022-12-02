import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { logout } from "../../store/session";
import { login } from "../../store/session";
import { loadCartItems, resetCart } from "../../store/cart";
import { loadAllAddresses } from "../../store/address";
import congo from "../../media/images/CONGO.png";
import congo2 from "../../media/images/CONGOblack.png";
import locationPin from "../../media/icons/locationPin.png";
import darkpin from "../../media/images/darkpin.png";
import downarrow from "../../media/images/downarrow.png";
import whitepin from "../../media/images/whitepin.png";
import hamburger from "../../media/images/hamburger.png";
import cartImage from "../../media/images/cart.png";
import flag from "../../media/icons/flag.png";
import "./header.css";

function Header() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [submitted, isSubmitted] = useState(false);
  const [focusClass, setFocusClass] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const session = useSelector((state) => state.session);
  const cart = useSelector((state) => state.cart);
  const defaultAddress = useSelector(state => state.addresses.default);

  useEffect(async () => {
    if (session?.user?.username) {
      let currentName = "";
      console.log(currentName);
      currentName = session.user.username.split(" ");
      console.log(currentName);
      currentName = currentName[0];
      console.log(currentName);
      if (currentName.length > 12) {
        currentName = currentName.slice(0, 8) + "...";
      }
      setName(
        currentName.charAt(0).toUpperCase() + currentName.slice(1).toLowerCase()
      );

      await dispatch(loadCartItems(session.user.id));
      await dispatch(loadAllAddresses(session.user.id));
    }
  }, [session]);

  useEffect(async () => {
    let cartCount = document.getElementsByClassName(
      "header-cart-counter-container"
    )[0];
    if (cart.totalQuantity > 9){
      cartCount.classList.add("cart-count-double-digit");
      cartCount.classList.remove("cart-count-single-digit");
    } else {
      cartCount.classList.add("cart-count-single-digit");
      cartCount.classList.remove("cart-count-double-digit");
    }
  }, [cart]);

  const departments = ['All', 'Alexa Skills', 'Amazon Devices', 'Amazon Explore', 'Amazon Pharmacy', 'Amazon Warehouse', 'Appliances', 'Apps & Games', 'Arts, Crafts & Sewing', 'Audible Books & Originals', 'Automotive Parts & Accessories', 'Baby', 'Beauty & Personal Care', 'Books', 'CDs & Vinyl', 'Cell Phones & Accessories', 'Clothing, Shoes & Jewely', 'Collectibles & Fine Art', 'Computes', 'Credit and Payment Cards', 'Digital Educational Resources', 'Digital Music', 'Electronics', 'Garden & Outdoor', 'Gift Cards', 'Grocery & Gourmet Food', 'Handmade', 'Health, Household & Babe Care', 'Home & Business Services', 'Home & Kitchen', 'Industrial & Scientific', 'Just for Prime', 'Kindle Store', 'Luggage & Travel Gear', 'Luxury Store', 'Magazine Subscriptions', 'Movies & TV', 'Musical Instruments', 'Office Products', 'Online Learning', 'Pet Supplies', 'Premium Beauty', 'Prime Video', 'Smart Home', 'Software', 'Sports & Outdoors', 'Subscription Boxes', 'Tools & Home Improvement', 'Toys & Games', 'Under $10', 'Video Games']
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
    "Audible",
  ];

  async function onSubmit(e) {
    e.preventDefault();
    history.push(`/products/search?input=${search}&category=${department}`);
  }

  const logoutFunc = async () => {
    await dispatch(resetCart());
    await dispatch(logout());
  };

  const logInDemo = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <div>
      <div className="header-outer-container">
        <div className="header-left-container">
          <div className="header-logo header-hover-border heading-working-hover">
            <img src={congo2} onClick={() => history.push("/")} />
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
          {/* {!session.user && (
            <div
              className="header-user-auth header-hover-border"
              onClick={() => history.push("/login")}
            >
              <p className="header-top-text">Hello, sign in</p>
              <p className="header-bottom-text">Account & Lists</p>
            </div>
          )} */}
          <div className="header-user-auth header-hover-border heading-working-hover">
            {session.user && <p className="header-top-text">Hello, {name}</p>}
            {!session.user && <p className="header-top-text">Hello, sign in</p>}
            <div className="header-bottom-acclists-img-container">
              <p className="header-bottom-text">Account & Lists</p>
              <img src={downarrow} />
            </div>
            <div className="header-account-dropdown-container">
              <div className="header-account-dropdown-arrow">
                <div className="header-account-dropdown-inner-arrow"></div>
              </div>
              {!session.user && (
                <div className="header-account-dropdown-signin-container">
                  {/* <a className="header-account-dropdown-signin">
                    <span className="header-account-dropdown-signin yellow-gradient-button">Sign in</span>
                  </a> */}
                  <div className="header-account-signin-demo-container">
                    <div
                      className="header-account-dropdown-signin yellow-gradient-button"
                      onClick={() => history.push("/login")}
                    >
                      Sign in
                    </div>
                    <div
                      className="header-account-dropdown-signin yellow-gradient-button"
                      onClick={() => logInDemo()}
                    >
                      Demo User
                    </div>
                  </div>
                  <p className="header-account-new-customer">
                    New customer?{" "}
                    <span
                      className="start-here-signup header-dropdown-text"
                      onClick={() => history.push("/sign-up")}
                    >
                      Start here.
                    </span>
                  </p>
                </div>
              )}
              <div className="header-account-dropdown-bottom">
                <div className="header-account-dropdown-seller">
                  <p className="header-account-dropdown-title">
                    Become a Seller
                  </p>
                  <a
                    className="header-dropdown-text"
                    onClick={() => {
                      if (session.user) {
                        history.push("/addproduct");
                      } else {
                        history.push("/login");
                      }
                    }}
                  >
                    Add a Product
                  </a>
                </div>
                <div className="header-account-dropdown-your-account">
                  <p className="header-account-dropdown-title">Your Account</p>
                  <a
                    className="header-dropdown-text"
                    onClick={() => logoutFunc()}
                  >
                    Sign Out
                  </a>
                </div>
                <div className="header-account-dropdown-buffer-top"></div>
                <div className="header-account-dropdown-buffer-right"></div>
                <div className="header-account-dropdown-buffer-bottom"></div>
                <div className="header-account-dropdown-buffer-left"></div>
              </div>
              <div className="header-dropdown-about-links">
                <p className="header-dropdown-about-links-p">
                  Developer: Kyle Kassen
                </p>
                <p>
                  LinkedIn:{" "}
                  <a href="https://www.linkedin.com/in/kyle-kassen/">
                    {" "}
                    Kyle Kassen
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="header-returns header-hover-border">
            <p className="header-top-text">Returns</p>
            <p className="header-bottom-text">& Orders</p>
          </div>
          <div className="header-cart header-hover-border" onClick={() => history.push('/cart')}>
            <div className="header-cart-counter-container">
              {cart.totalQuantity < 100 &&<span>{cart.totalQuantity}</span>}
              {cart && cart.totalQuantity > 99 && <span>99+</span>}
              {!cart && <span>0</span>}
            </div>
            <img src={cartImage} />
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
          let navItem2 = navItem.slice(0, 3).toLowerCase();
          if (navItem === "Amazon Basics") navItem2 = "bas";
          else if (navItem === "Amazon Explore") navItem2 = "exp";
          else if (navItem === "Amazon Home") navItem2 = "ho2";
          return (
            <div
              className={`header-mainnav-item-container header-mainnav-${navItem2}`}
            >
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
