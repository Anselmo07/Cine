/*----------- AXIOS -----------*/
const axios = require("axios");
const renderCards = require("./renderCards");
const createMovie = require("./createMovie");
const peliculasPopulares = require("./peliculasPopulares");
const peliculasRecomend = require("./peliculasRecomend");


const cardsContainer = document.querySelector("#movies");

const apiUrl = process.env.VITE_API_URL;

if (cardsContainer) {
    (async function () {
        try {
            const response = await axios.get(`${apiUrl}/movies`);
            renderCards(response.data, cardsContainer);
            peliculasPopulares();
            peliculasRecomend();
        } catch (error) {
            console.error("Error al obtener películas:", error);
        }
    })();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        createMovie();
    });
}