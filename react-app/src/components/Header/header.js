import React, { useState, useEffect} from 'react';
import NavBar from '../NavBar';
import amazonheader from '../../media/images/amazonheader.png'


function Header() {

    return (
        <div className="header-outer-container">
            <div className="header-logo">
                <img src={amazonheader}/>
            </div>
            <div className="header-navmenu">
                <NavBar />
            </div>
            <div className="header-set-location">
                Set Location
            </div>
            <div className="header-search-bar">
                Search Section
            </div>
            <div className="header-language">
                language
            </div>
            <div className="header-user-auth">
                user auth
            </div>
            <div className="header-returns">
                returns
            </div>
            <div className="header-cart">
                cart button
            </div>
        </div>
    )
}

export default Header;
