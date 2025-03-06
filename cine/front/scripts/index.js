/*----------- AXIOS -----------*/
const axios = require("axios");
const renderCards = require('./renderCards');
const createMovie = require('./createMovie');
const peliculasPopulares = require('./peliculasPopulares');
const peliculasRecomend = require('./peliculasRecomend');



const cardsContainer = document.querySelector("#movies");

const apiUrl = "http://localhost:3000";
console.log("API URL:", apiUrl);


if (cardsContainer) {
    (async function () {
        try {
            const response = await axios.get("http://localhost:4000/movies");
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

// module.exports = {
//     renderCards,
//     createMovie,
//     peliculasPopulares,
//     peliculasRecomend
// };

// (async function () {
//     try {
//         const response = await axios.get(`${apiUrl}/movies`);
//         if (cardsContainer) {
//             renderCards(response.data, cardsContainer);
//         } else {
//             console.warn("El contenedor de películas no existe.");
//         }
//     } catch (error) {
//         console.error("Error al obtener películas:", error);
//     }
// })();
