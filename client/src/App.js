import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MoviesContainer from "./components/MoviesContainer";
import Search from "./components/Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import Login from "./components/Login";
import SignIn from "./components/SignIn";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            {user ? (
              <>
                <Header />
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterInput={filterInput}
                  setFilterInput={setFilterInput}
                />
                <MoviesContainer
                  searchQuery={searchQuery}
                  filterInput={filterInput}
                />
              </>
            ) : (
              <SignIn />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
