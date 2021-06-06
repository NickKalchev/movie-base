import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { setType } from "../features/inputTypeSlice";

function Search({ searchQuery, setSearchQuery, filterInput, setFilterInput }) {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("Title");
  const refference = useRef(null);

  const dispatch = useDispatch();

  const scrollToRefference = (ref) => {
    window.scrollTo({
      top: ref.current,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (value) => {
    setSearchQuery(value);
    setInput(value);
    if (value.length > 0) {
      scrollToRefference(refference);
    }
  };

  const changeType = (value) => {
    setSearchType(value);
    dispatch(setType(value));
  };

  const changeFilterValue = (value) => {
    setFilterInput(value);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const clearSearchInput = () => {
    setSearchQuery("");
    setInput("");
    scrollUp();
  };


  useEffect(() => {
    if (input === "") {
      scrollUp();
    }
  }, [input]);

  return (
    <div className="search" ref={refference}>
      <div className="search__searchInput">
        <form className="search__form">
          <SearchIcon />
          <input
            className="search__input"
            type="text"
            placeholder="Search for a movie by title"
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button
            className={
              !input
                ? "search__inputButtonDisabled"
                : "search__inputButtonEnabled"
            }
            disabled={input === ""}
            onClick={() => clearSearchInput()}
          >
            Clear
          </button>
        </form>
      </div>
      <div className="search__filterOptions">
        <h2>Filter by:</h2>

        <form className="search__filterOptions--form">
          <select
            value={changeType.value}
            onChange={(e) => changeType(e.target.value)}
          >
            <option value="Title"> </option>
            <option value="Year">Year</option>
            <option value="Type">Type</option>
          </select>
          <input
            type="text"
            placeholder={
              searchType === "Year"
                ? "e.g. 2021"
                : searchType === "Type"
                ? "movie, series or episode"
                : ""
            }
            value={filterInput}
            onChange={(e) => changeFilterValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default Search;
