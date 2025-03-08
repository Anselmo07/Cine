function renderCards(data, container) {
    // Usamos el contenedor que se pasa como parámetro
    const movieContainer = container;

    const movieTarjeta = data.map((movie) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "tarjeta";

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

        const director = document.createElement('p');
        director.className = 'movie-director';
        director.textContent = `Director: ${movie.director}`;

        const duration = document.createElement('p');
        duration.className = 'movie-duration';
        duration.textContent = `Duration: ${movie.duration}`;

        const genre = document.createElement('p');
        genre.className = 'movie-genre';
        genre.textContent = `Genre: ${movie.genre}`;

        const rating = document.createElement('p');
        rating.className = 'movie-rating';
        rating.textContent = `Rateing: ${movie.rate}`;

        tarjeta.appendChild(img);
        tarjeta.appendChild(title);
        tarjeta.appendChild(year);
        tarjeta.appendChild(director);
        tarjeta.appendChild(duration);
        tarjeta.appendChild(genre);
        tarjeta.appendChild(rating);

        return tarjeta;
    });

    movieTarjeta.forEach(tarjeta => movieContainer.appendChild(tarjeta));
};

export default renderCards;
