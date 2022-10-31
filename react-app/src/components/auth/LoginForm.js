import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import congowhite from "../../media/images/CONGOwhite.png";
import "./login.css";

const LoginForm = () => {
  const [showField, setShowField] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
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
      <div className="login-img-container">
        <img src={congowhite} />
      </div>
      <div className="login-width-provider">
        <div className="login-form-container">
          <h1 className="login-sign-in">Sign in</h1>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
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
            {showField && (
              <div className="login-field">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                />
                <button type="submit">Login</button>
              </div>
            )}
            <div>
              <button
                className="login-form-button yellow-gradient-button"
                onClick={() => setShowField(true)}
              >
                Continue
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
        <button className="login-signup-button">Create your Amazon account</button>
      </div>
    </div>
  );
};

export default LoginForm;
