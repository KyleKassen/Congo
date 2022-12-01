import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SearchResults() {

    const location= useLocation()
    let url = new URL(window.location.href)

    const searchParams = url.searchParams

    const category = searchParams.get('category')
    const searchInput = searchParams.get('input')
    console.log(category)
    console.log(searchInput)

    let test = async () => {
        let response = await fetch(`/api/businesses/query?search=${search}`)
        setBusinesses(await response.json())
    }

    return (
        <>
        <p>hello</p>
        </>
    )
}

export default SearchResults;
