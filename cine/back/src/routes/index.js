const { Router } = require("express");
const { testController, createMovies } = require("../controllers/controllers");

const router = Router();

router.get("/movies", testController);

router.post("/movies", createMovies);

module.exports = router;