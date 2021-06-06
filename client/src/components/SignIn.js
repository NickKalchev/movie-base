import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../stylesheets/SignIn.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { login } from "../features/userSlice";
import HeaderImage from "../images/movie_base_logo.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <div className="signIn">
      <Link to="/">
        <img src={HeaderImage} alt="" />
      </Link>

      <div className="signIn__form">
        <h1>Sign in</h1>
        <p>
          Just one more step to use the Movie Base Search Engine. Please, sign
          in.
        </p>
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

          <button type="submit" onClick={loginToApp}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
