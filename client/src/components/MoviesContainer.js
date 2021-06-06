import React, { useState, useEffect } from "react";
import "../stylesheets/MoviesContainer.css";
import MovieCard from "./MovieCard";
import LoadingMovieCard from "./LoadingMovieCard";
import { useSelector } from "react-redux";
import { selectType } from "../features/inputTypeSlice";

function MoviesContainer({ searchQuery, filterInput }) {
  const [movies, setMovies] = useState([]);
  const [moviesByYear, setMoviesByYear] = useState([]);
  const [moviesByType, setMoviesByType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchType, setSearchType] = useState("Title");

  const type = useSelector(selectType);

  useEffect(() => {
    setSearchType(type);
  }, [type]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchQuery.length === 0) {
      setLoading(true);
      setMessage("");
    }
    if (searchQuery.length > 0) {
      setLoading(true);
      setMessage("Loading");

      const fetchData = async () => {
        try {
          const res = await fetch(`/search/?searchQuery=${searchQuery}`, {
            signal,
          });

          if (res.status >= 200 && res.status < 400) {
            const resJSON = await res.json();

            if (resJSON.Response === "True") {
              setMovies(resJSON);
              setLoading(false);
            } else if (resJSON.Response === "False") {
              setMessage("Sorry, no movies found! Please, try again.");
            }
          } else {
            setLoading(false);
            setMessage("Something went wrong. Please, try again.");
          }
        } catch (error) {
          if (signal.aborted) {
            console.log("Request was aborted");
          } else {
            console.log(error);
          }
        }
      };
      fetchData();

      return () => {
        controller.abort();
      };
    }
  }, [searchQuery, filterInput, searchType]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchQuery.length === 0) {
      setLoading(true);
      setMessage("");
    }
    if (
      searchQuery.length > 0 &&
      searchType === "Year" &&
      filterInput.length > 3
    ) {
      setLoading(true);
      setMessage("Loading");

      const fetchData = async () => {
        try {
          const res = await fetch(
            `/search-by-year/?searchQuery=${searchQuery}&year=${filterInput}`,
            {
              signal,
            }
          );

          if (res.status >= 200 && res.status < 400) {
            const resJSON = await res.json();

            if (resJSON.Response === "True") {
              setMoviesByYear(resJSON);
              setLoading(false);
            } else if (resJSON.Response === "False") {
              setMessage("Sorry, no movies found! Please, try again.");
            }
          } else {
            setLoading(false);
            setMessage("Something went wrong. Please, try again.");
          }
        } catch (error) {
          if (signal.aborted) {
            console.log("Request was aborted");
          } else {
            console.log(error);
          }
        }
      };
      fetchData();

      return () => {
        controller.abort();
      };
    }
  }, [searchQuery, filterInput, searchType]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchQuery.length === 0) {
      setLoading(true);
      setMessage("");
    }
    if (
      searchQuery.length > 0 &&
      searchType === "Type" &&
      filterInput.length > 4
    ) {
      setLoading(true);
      setMessage("Loading");

      const fetchData = async () => {
        try {
          const res = await fetch(
            `/search-by-type/?searchQuery=${searchQuery}&type=${filterInput}`,
            {
              signal,
            }
          );

          if (res.status >= 200 && res.status < 400) {
            const resJSON = await res.json();

            if (resJSON.Response === "True") {
              setMoviesByType(resJSON);
              setLoading(false);
            } else if (resJSON.Response === "False") {
              setMessage("Sorry, no movies found! Please, try again.");
            }
          } else {
            setLoading(false);
            setMessage("Something went wrong. Please, try again.");
          }
        } catch (error) {
          if (signal.aborted) {
            console.log("Request was aborted");
          } else {
            console.log(error);
          }
        }
      };
      fetchData();

      return () => {
        controller.abort();
      };
    }
  }, [searchQuery, filterInput, searchType]);

  useEffect(() => {
    if (
      loading &&
      searchQuery.length > 0 &&
      message === "Sorry, no movies found! Please, try again."
    ) {
      const timeId = setTimeout(() => {
        alert(message);
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [loading, searchQuery, message]);

  return (
    <div className="movieContainer">
      {searchQuery.length > 0 &&
      loading === false &&
      searchType === "Year" &&
      filterInput.length > 3 &&
      moviesByYear.length !== 0 ? (
        [moviesByYear]?.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            image={movie.Poster}
            year={movie.Year ? movie.Year.split("-")[0] : null}
          />
        ))
      ) : searchQuery.length > 0 &&
        loading === false &&
        searchType === "Type" &&
        moviesByType.length !== 0 ? (
        [moviesByType]?.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            image={movie.Poster}
            year={movie.Year ? movie.Year.split("-")[0] : null}
          />
        ))
      ) : searchQuery.length > 0 && loading === false && movies.length !== 0 ? (
        movies?.Search.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            image={movie.Poster}
            year={movie.Year ? movie.Year.split("-")[0] : null}
          />
        ))
      ) : loading && searchQuery.length > 0 ? (
        Array.from(new Array(12)).map((item, index) => (
          <LoadingMovieCard key={index} />
        ))
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
}

export default MoviesContainer;
