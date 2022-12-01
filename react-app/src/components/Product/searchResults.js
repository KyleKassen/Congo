import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SearchResults() {
    const [products, setProducts] = useState([])
    const location= useLocation()
    let url = new URL(window.location.href)

    const searchParams = url.searchParams

    const category = searchParams.get('category') ? searchParams.get('category') : "All"
    const searchInput = searchParams.get('input')
    console.log(category)
    console.log(searchInput)

    let getProducts = async () => {
        let response = await fetch(`/api/products/lookup?search=${searchInput}&category=${category}`)
        let resultingProducts = await response.json()
        setProducts([...Object.values(resultingProducts)])
    }

    useEffect(() => {
        getProducts()
    }, [location])

    return (
        <>
        <div className="search-outer-container">
            <div className="search-container">
                <div className="search-header-container">
                    <p>{products.length} result for <span>"{searchInput}"</span></p>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchResults;
