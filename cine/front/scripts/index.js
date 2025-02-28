/*----------- AXIOS -----------*/
const axios = require("axios");
const renderCards = require("./renderCards");
const createMovie = require("./createMovie");
const peliculasPopulares = require("./peliculasPopulares");
const peliculasRecomend = require("./peliculasRecomend");


const cardsContainer = document.querySelector("#movies");
const genreSciFiContainer = document.querySelector("#genre-Sci-Fi");
const genreActionContainer = document.querySelector("#Action");
const genreComedyContainer = document.querySelector("#Comedy");
const genreFantasyContainer = document.querySelector("#Fantasy");
const genreHorrorContainer = document.querySelector("#Horror");
const genreRomanceContainer = document.querySelector("#Romance");
const genreThrillerContainer = document.querySelector("#Thriller");

if (cardsContainer) {
    (async function () {
        try {
            const response = await axios.get("http://localhost:3000/movies");
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

const fetchSciFiMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Sci-Fi");
        renderCards(response.data, genreSciFiContainer);
    } catch (error) {
        console.error("Error al obtener películas de Sci-Fi", error);
    }
};

const fetchActionMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Action");
        renderCards(response.data, genreActionContainer);
    } catch (error) {
        console.error("Error al obtener películas de Acción", error);
    }
}

const fetchComedyMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Comedy");
        renderCards(response.data, genreComedyContainer);
    } catch (error) {
        console.error("Error al obtener películas de Acción", error);
    }
}

const fetchFantasyMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Fantasy");
        renderCards(response.data, genreFantasyContainer);
    } catch (error) {
        console.error("Error al obtener películas de Acción", error);
    }
}

const fetchHorrorMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Horror");
        renderCards(response.data, genreHorrorContainer);
    } catch (error) {
        console.error("Error al obtener películas de Acción", error);
    }
}

const fetchRomanceMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Romance");
        renderCards(response.data, genreRomanceContainer);
    } catch (error) {
        console.error("Error al obtener películas de Acción", error);
    }
}

const fetchThrillerMovies = async () => {
    try {
        const response = await axios.get("http://localhost:3000/movies?genre=Thriller");
        renderCards(response.data, genreThrillerContainer);
    } catch (error) {
        console.error("Error al obtener películas de Acción", error);
    }
}

fetchSciFiMovies();
fetchActionMovies();
fetchComedyMovies();
fetchFantasyMovies();
fetchHorrorMovies();
fetchRomanceMovies();
fetchThrillerMovies();

