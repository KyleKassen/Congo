import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import congowhite from "../../media/images/CONGOwhite.png";
import amazonicons from "../../media/images/amazonicons.png";
import "./login.css";

const LoginForm = () => {
  const [showField, setShowField] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPassError, setShowPassError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    if (data?.length > 1) {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
      setShowField(true);
    }

    if (email && password && data?.length == 1) {
      setShowPassError(true);
    }
  };

  const onChange = () => {
    setShowEmailError(false);
    setShowField(false);
    setErrors([]);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-img-container" onClick={() => history.push("/")}>
        <img src={congowhite} />
      </div>
      <div className="login-width-provider">
        {(showEmailError || showPassError) && (
          <div className="login-error-wrapper">
            {!showPassError && (
              <>
                <div className="login-error-container">
                  <h4>There was a problem</h4>
                  <p>We cannot find an account with that email address</p>
                  <i className="login-error-icon"></i>
                </div>
              </>
            )}
            {showPassError && (
              <>
                <div className="login-error-container">
                  <h4>There was a problem</h4>
                  <p>Your password is incorrect</p>
                  <i className="login-error-icon"></i>
                </div>
              </>
            )}
          </div>
        )}
        <div className="login-form-container">
          <h1 className="login-sign-in">Sign in</h1>
          <form onSubmit={onLogin}>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            {!showField && (
              <div className="login-field">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  // placeholder="Email"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
            )}
            {showField && !showEmailError && (
              <div className="login-entered-email-container">
                <p>
                  {email} <span onClick={onChange}>Change</span>
                </p>
              </div>
            )}
            {showField && !showEmailError && (
              <div className="login-field">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  // placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                />
                <button
                  className="login-form-button yellow-gradient-button"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            )}
            {(!showField || showEmailError) && (
              <div>
                <button
                  className="login-form-button yellow-gradient-button"
                  onClick={onLogin}
                >
                  Continue
                </button>
              </div>
            )}
            <div>
            <button
                  className="login-form-button yellow-gradient-button"
                  onClick={onLogin}
                >
                  Demo User
                </button>
            </div>
          </form>
          <div className="login-form-bottom-text">
            <p>
              By continuing, you agree to Congo's Conditions of Use and Privacy
              Notice.
            </p>
          </div>
        </div>
        <div className="login-divider">
          <h5>New to Amazon?</h5>
        </div>
        <button className="login-signup-button" onClick={() => history.push('/sign-up')}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
