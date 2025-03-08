/*----------- AXIOS -----------*/
// import axios from 'axios';
import renderCards from './renderCards.js';
import createMovie from './createMovie.js';
import peliculasPopulares from './peliculasPopulares.js';
import peliculasRecomend from './peliculasRecomend.js';

const cardsContainer = document.querySelector("#movies");


// const API_URL = "https://cine-kcer.onrender.com";


if (cardsContainer) {
    (async function () {
        try {
            const response = await axios.get(`${API_URL}/movies`);
            renderCards(response.data, cardsContainer);
            peliculasPopulares();
            peliculasRecomend();
        } catch (error) {
            console.error("Error al obtener películas:", error);
        }
    })();
}else {
    document.addEventListener("DOMContentLoaded", () => {
        createMovie();
    });
}
