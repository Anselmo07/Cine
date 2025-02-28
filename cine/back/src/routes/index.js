const { Router } = require("express");
const { testController, createMovies, getMoviesByGenre } = require("../controllers/controllers");

const router = Router();

router.get("/movies", testController);

router.get("/movies/genre", getMoviesByGenre)

router.post("/movies", createMovies);

module.exports = router;