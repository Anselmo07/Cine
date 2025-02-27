const movieService = require("../services/movieService");

const testController = async (req, res) => {
    try{
        const movies = await movieService.getMovies();
        console.log("Peliculas encontradas: ", movies);
        res.status(200).json(movies);

    } catch (error) {
        console.error("Error al obtener peliculas", error);
        res.status(500).json({ erro: error.message });
    }
};

const createMovies = async (req, res) => {
    const { title, year, director, duration, genre, rate, poster} = req.body;
    const movie = await movieService.createMovies( title, year, director, duration, genre, rate, poster);
    res.status(201).json(movie);
};

module.exports = { testController, createMovies };

