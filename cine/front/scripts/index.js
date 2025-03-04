/*----------- AXIOS -----------*/
import axios from "axios";
import renderCards from "./renderCards";
import createMovie from "./createMovie";
import peliculasPopulares from "./peliculasPopulares";
import peliculasRecomend from "./peliculasRecomend";

const cardsContainer = document.querySelector("#movies");

const apiUrl = 'http://localhost:3000';

if (cardsContainer) {
    (async function () {
        try {
            const response = await axios.get(`${apiUrl}/movies`);
            console.log(response.data);
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