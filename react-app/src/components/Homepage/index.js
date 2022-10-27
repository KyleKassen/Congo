import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import home1 from "../../media/images/home1.jpg";
import home2 from "../../media/images/home2.jpg";
import home3 from "../../media/images/home3.jpg";
import "./homepage.css";

function Homepage() {
    const [imageClass, setImageClass] = useState(1);

    let changeSlide = incr => {

    }
  return (
    <>
      <div className="home-outer-wrapper">
        <div className="home-outer-container">
          <div className="home-carousel-container">
            <a className="home-carousel-previous" onclick={()=> changeSlide(-1)}>
            &#10094;
            </a>
            <a className="home-carousel-next" onclick={()=> changeSlide(-1)}>
            &#10095;
            </a>
            <div className="home-carousel-image-container">
                <img className={`home-carousel-image${imageClass}`}src={home1} />
                <img className={`home-carousel-image${imageClass}`}src={home2} />
                <img className={`home-carousel-image${imageClass}`}src={home3} />
            </div>
          </div>
          <h1>HomePage</h1>
        </div>
      </div>
    </>
  );
}

export default Homepage;
