const Movie = require("../models/Movie");

module.exports = {
    getMovies: async () => {
        try{
            const movies = await Movie.find();
            return movies;
            
        } catch (err) {
            console.error("Error al obtener peliculas", err);
            throw new Error("Error al obtener peliculas");
        }
    },

    createMovies: async (title, year, director, duration, genre, rate, poster) => {
        const movie = await Movie.create({ title, year, director, duration, genre, rate, poster});
        return movie;
    },
    
};