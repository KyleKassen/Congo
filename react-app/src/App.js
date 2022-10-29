import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Header from "./components/Header/header";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Homepage from "./components/Homepage";
import Product from "./components/Product";
import CreateReview from "./components/Forms/ReviewForms/createReview";
import { authenticate } from "./store/session";
import { loadAllProducts, loadOneProduct } from "./store/product";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(loadAllProducts());
      setLoaded(true);
    })();
  }, [dispatch]);

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
        <Route path="/product/:productId" exact={true}>
          <Header />
          <Product />
        </Route>
        <Route path="/product/:productId/create" exact={true}>
          <Header />
          <CreateReview />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
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
