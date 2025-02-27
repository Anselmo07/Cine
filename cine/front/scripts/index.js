/*----------- AXIOS -----------*/
const axios = require("axios");
const renderCards = require("./renderCards");
const createMovie = require("./createMovie");
const peliculasPopulares = require("./peliculasPopulares");

const cardsContainer = document.querySelector("#Peliculas-recomendadas");

if(cardsContainer){

    (async function (){
        axios.get("http://localhost:3000/movies").then((res) => { renderCards(res.data) }).catch((err) => { renderCards(err); });
        peliculasPopulares();
    })();
}else{
    document.addEventListener('DOMContentLoaded', () => {
        createMovie();
    });
} 



