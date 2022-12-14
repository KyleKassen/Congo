import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import home1 from "../../media/images/home1.jpg";
import home2 from "../../media/images/home2.jpg";
import home3 from "../../media/images/home3.jpg";
import "./carousel.css";

function Carousel() {
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
      <div className="carousel-outer-wrapper">
        <div className="carousel-outer-container">
          <div className="carousel-carousel-container">
            <a
              className="carousel-carousel-previous"
              tabindex="0"
              onClick={() => changeSlide(-1)}
            >
              &#10094;
            </a>
            <a className="carousel-carousel-next" tabindex="0" onClick={() => changeSlide(1)}>
              &#10095;
            </a>
            <div className="carousel-carousel-image-container">
                <img className={`carousel-carousel-image${image1}`} src={home1} />
                <img className={`carousel-carousel-image${image2}`} src={home2} />
                <img className={`carousel-carousel-image${image3}`} src={home3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
