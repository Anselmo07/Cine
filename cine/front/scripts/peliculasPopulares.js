import tempData from "./tempData.js"

function peliculasPopulares() {
    const movieContainer = document.getElementById("Peliculas-populares");
    
    const movieTarjeta = tempData.map((movie, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "tarjeta";
        tarjeta.setAttribute('data-index', index + 1);

        const number = document.createElement('div');
        number.className = "number";
        number.textContent = index + 1;

        const img = document.createElement('img');
        img.className = "img-movie";
        img.src = movie.poster;
        img.alt = `${movie.title} Poster`;

        const title = document.createElement('h2');
        title.className = "movie-title";
        title.textContent = movie.title;

        const year = document.createElement('p');
        year.className = 'movie-year';
        year.textContent = `Year: ${movie.year}`;

        const rating = document.createElement('p');
        rating.className = 'movie-rating';
        rating.textContent = `Rateing: ${movie.rate}`;


        tarjeta.appendChild(number);
        tarjeta.appendChild(img);
        tarjeta.appendChild(title);
        tarjeta.appendChild(year);
        tarjeta.appendChild(rating);

        return tarjeta;
    });

    movieTarjeta.forEach(tarjeta => movieContainer.appendChild(tarjeta));
        
};

export default peliculasPopulares;