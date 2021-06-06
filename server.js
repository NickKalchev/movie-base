const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fetch = require("node-fetch");
const logger = require('./Utils/Logger');

const apiKey = "&apikey=5300fa20";
const PORT = 3001;

const app = express();
app.use(cors({ origin: true }));

app.get("/search/", async (req, res) => {
  try {
    const movies = await fetch(
      `http://www.omdbapi.com/?s=${req.query.searchQuery}` + apiKey
    );
    const moviesJSON = await movies.json();
    res.json(moviesJSON);
    logger.info('Movies obtained from OMDB')
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured, while obtaining results");
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
});

app.get("/search-by-year/", async (req, res) => {
  try {
    const movies = await fetch(
      `http://www.omdbapi.com/?t=${req.query.searchQuery}&y=${req.query.year}` +
        apiKey
    );
    const moviesJSON = await movies.json();
    res.json(moviesJSON);
    logger.info('Movies filtered by year obtained from OMDB')
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured, while obtaining results");
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
});

app.get("/search-by-type/", async (req, res) => {
  try {
    const movies = await fetch(
      `http://www.omdbapi.com/?t=${req.query.searchQuery}&type=${req.query.type}` +
        apiKey
    );
    const moviesJSON = await movies.json();
    res.json(moviesJSON);
    logger.info('Movies filtered by type obtained from OMDB')
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured, while obtaining results");
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
});

app.listen(PORT || 3002, () =>
  logger.info(`Server running on ${PORT || 3002}!`)
);
