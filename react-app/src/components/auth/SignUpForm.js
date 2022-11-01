import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import congowhite from "../../media/images/CONGOwhite.png";
import "./signup.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [errormsgs, setErrorMsgs] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let currentErrors = {}

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
      for(let err of data) {
        console.log(err)
        if (err.startsWith('email')) {
          currentErrors['email'] = 'Email address already exists in our system'
        }
      }
    }

    if (!username) currentErrors['name'] = 'Enter your name';
    if (!email) currentErrors['email'] = 'Enter your email';
    if (password.length < 6) currentErrors['password'] = 'Minimum 6 characters required';
    if (password !== repeatPassword) currentErrors['password2'] = 'Passwords must match'

    setErrorMsgs(currentErrors);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-wrapper">
      <div className="login-img-container">
        <img src={congowhite} />
      </div>
      <div className="login-width-provider">
        <div className="signup-form-container">
          <h1 className="signup-create-account">Create Account</h1>
          <form onSubmit={onSignUp}>
            {/* <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div> */}
            <div className="signup-field">
              <label>Your name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                placeholder="First and last name"
                value={username}
              ></input>
              {errormsgs.name && (
              <div className="form-error-container">
                <p className="form-error-text"><i className="form-error-icon"></i> {errormsgs.name}</p>
              </div>
              )}
            </div>
            <div className="signup-field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            {errormsgs.email && (
              <div className="form-error-container">
                <p className="form-error-text"><i className="form-error-icon"></i> {errormsgs.email}</p>
              </div>
              )}
            <div className="signup-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                placeholder="At least 6 characters"
                value={password}
              ></input>
            </div>
            {!Object.values(errormsgs).length && (
              <div className="form-error-container">
                <p className="form-non-error-text"><i className="form-non-error-icon"></i> Passwords must be at least 6 characters.</p>
              </div>
              )}
            {errormsgs.password && (
              <div className="form-error-container">
                <p className="form-error-text"><i className="form-error-icon"></i> {errormsgs.password}</p>
              </div>
              )}
            <div className="signup-field">
              <label>Re-enter Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            {errormsgs.password2 && (
              <div className="form-error-container">
                <p className="form-error-text"><i className="form-error-icon"></i> {errormsgs.password2}</p>
              </div>
              )}
            <button className="login-form-button yellow-gradient-button" type="submit">Sign Up</button>
          </form>
          <div className="signup-form-bottom-text">
            <p>
              By continuing, you agree to Congo's Conditions of Use and Privacy
              Notice.
            </p>
          </div>
            <div className="form-bottom-divider"></div>
            <p>Already have an account? <span className="signup-bottom-signin" onClick={() => history.push("/login")}>Sign in</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
