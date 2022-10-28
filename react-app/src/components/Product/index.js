import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadOneProduct } from "../../store/product"



import './product.css'


function Product() {
    const {productId} = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(loadOneProduct(productId))
        })();
    }, [])

    return (
        <h1>Product Page</h1>
    )
}

export default Product;
