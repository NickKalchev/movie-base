import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth } from "../firebase";
import HeaderImage from "../images/movie_base_logo.png";
import LoginImage from "../images/login.png";
import "../stylesheets/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .then((auth) => {
        history.push("/home");
      })
      .catch((error) => alert(error));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        );
      })
      .then((auth) => {
        history.push("/home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__header">
        <img src={HeaderImage} alt="" />
      </div>

      <div className="login__body">
        <div className="login__bodyInfo">
          <h1>Welcome to Movie Base</h1>
          <div className="login__bodyForm">
            <form>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />

              <button
                className="login__bodyForm--signinButton"
                type="submit"
                onClick={loginToApp}
              >
                Sign in
              </button>

              <p>You don't have an account?</p>
              <p>Fill in the Email and Password and click Register</p>

              <button
                className="login__bodyForm--signinButton"
                type="submit"
                onClick={register}
              >
                Register
              </button>
            </form>
          </div>
        </div>

        <div className="login__bodyImage">
          <img src={LoginImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
