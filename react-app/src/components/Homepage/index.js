import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import home1 from "../../media/images/home1.jpg";
import home2 from "../../media/images/home2.jpg";
import home3 from "../../media/images/home3.jpg";
import "./homepage.css";

function Homepage() {
  const [imageIndex, setImageIndex] = useState(1);
  const [image1, setImage1] = useState("1");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  let changeSlide = (incr) => {

      if ((imageIndex===3 && incr===1)||(imageIndex===2 && incr===-1)) setImage1("1");
      else setImage1("")
      if ((imageIndex===1 && incr===1)||(imageIndex===3 && incr===-1)) setImage2("2");
      else setImage2("")
      if ((imageIndex===2 && incr===1)||(imageIndex===1 && incr===-1)) setImage3("3");
      else setImage3("")

      if (imageIndex === 1 && incr === -1) setImageIndex(3);
      else if (imageIndex === 3 && incr === 1) setImageIndex(1);
      else setImageIndex(imageIndex + incr);
  };
  return (
    <>
      <div className="home-outer-wrapper">
        <div className="home-outer-container">
          <div className="home-carousel-container">
            <a
              className="home-carousel-previous"
              tabindex="0"
              onClick={() => changeSlide(-1)}
            >
              &#10094;
            </a>
            <a className="home-carousel-next" tabindex="0" onClick={() => changeSlide(1)}>
              &#10095;
            </a>
            <div className="home-carousel-image-container">
              {/* {imageClass === 1 && (
                <img className={`home-carousel-image-show`} src={home1} />
              )}
              {imageClass === 2 && (
                <img className={`home-carousel-image-show`} src={home2} />
              )}
              {imageClass === 3 && (
                <img className={`home-carousel-image-show`} src={home3} />
              )} */}
                <img className={`home-carousel-image${image1}`} src={home1} />
                <img className={`home-carousel-image${image2}`} src={home2} />
                <img className={`home-carousel-image${image3}`} src={home3} />
            </div>
          </div>
          <h1>HomePage</h1>
        </div>
      </div>
    </>
  );
}

export default Homepage;
