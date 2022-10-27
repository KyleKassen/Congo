import React, { useState, useEffect } from "react";
import Carousel from '../Carousel'
import { useSelector } from "react-redux";
import "./homepage.css";

function Homepage() {

  return (
    <>
      <Carousel />
      <div className="home-outer-wrapper">
        
      </div>
    </>
  );
}

export default Homepage;
