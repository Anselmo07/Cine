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

const getMoviesByGenre = async (req, res) => {
    const { genre } = req.query;
    
    if (!genre) {
        return res.status(400).json({ error: "Debes proporcionar un género" });
    }

    try {
        const movies = await movieService.getMoviesByGenre(genre);
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error al obtener películas por género", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { testController, createMovies, getMoviesByGenre };

