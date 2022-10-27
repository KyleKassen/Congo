import React, { useState, useEffect } from "react";
import Carousel from '../Carousel'
import { useSelector } from "react-redux";
import "./homepage.css";

function Homepage() {

  return (
    <>
      <Carousel />
      <div className="home-outer-wrapper">
        <div className="home-outer-container">
          <div className="home-grid-container">
            <div className="home-grid-item-1">
              <div className="home-grid-item-1-header">

              </div>
              <div className="home-grid-item-1-body">

              </div>
              <div className="home-grid-item-1-footer">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
