import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Header from "./components/Header/header";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Homepage from "./components/Homepage";
import Product from "./components/Product";
import SearchResults from "./components/Product/searchResults";
import Cart from "./components/Cart";
import CreateReview from "./components/Forms/ReviewForms/createReview";
import ProductForm from "./components/Forms/Product/productForm";
import Checkout from "./components/Checkout";
import { authenticate } from "./store/session";
import { loadAllProducts, loadOneProduct } from "./store/product";
import { loadAllAddresses } from "./store/address";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(loadAllProducts());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(async () => {
    if (session?.user?.username)
    await dispatch(loadAllAddresses(session.user.id))
  }, [loaded])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/addproduct" exact={true}>
          <Header />
          <ProductForm createProduct={true} />
        </Route>
        <Route path="/editproduct/:productId" exact={true}>
          <Header />
          <ProductForm createProduct={false} />
        </Route>
        <Route path="/product/:productId" exact={true}>
          <Header />
          <Product />
        </Route>
        <Route path="/product/:productId/create" exact={true}>
          <Header />
          <CreateReview />
        </Route>
        <Route path="/products/search">
          <Header />
          <SearchResults />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/cart" exact={true}>
          <Header />
          <Cart />
        </ProtectedRoute>
        <ProtectedRoute path="/checkout" exact={true}>
          {/* <Header /> */}
          <Checkout />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Header />
          <Homepage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
