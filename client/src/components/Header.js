import React from "react";
import "../stylesheets/Header.css";
import Image from "../images/movie_base_logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { auth } from "../firebase";

function Header() {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <img src={Image} alt="" />
      <div className="header__options">
        <button onClick={logoutOfApp}>Sign out</button>
      </div>
    </div>
  );
}

export default Header;
