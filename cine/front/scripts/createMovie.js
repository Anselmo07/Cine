// Asegúrate de que `API_URL` esté disponible en el entorno
// const API_URL = typeof API_URL !== "undefined" ? API_URL : "http://localhost:3000";
// const API_URL = "https://cine-kcer.onrender.com";

function createMovie() {
    const titleInput = document.getElementById("title");
    const yearInput = document.getElementById("year");
    const directorInput = document.getElementById("director");
    const durationInput = document.getElementById("duration");
    const genreInput = document.getElementById("genre");
    const rateInput = document.getElementById("rate");
    const posterInput = document.getElementById("poster");
    const button = document.getElementById("button");
    const buttonBorrar = document.getElementById("buttonBorrar");

    const handler = async (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const year = yearInput.value;
        const director = directorInput.value;
        const duration = durationInput.value;
        const genre = genreInput.value;
        const rate = rateInput.value;
        const poster = posterInput.value;

        if (title && year && director && duration && genre && rate && poster) {
            try {
                const response = await axios.post(`${API_URL}/movies`, {
                    title,
                    year,
                    director,
                    duration,
                    genre,
                    rate,
                    poster
                });

                if (response.status === 201) {
                    alert('Formulario enviado correctamente.');
                } else {
                    alert('Hubo un problema al enviar el formulario.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al crear la película.');
            }
        } else {
            alert('Por favor complete todos los campos del formulario.');
        }
    };

    const buttonLimpiar = () => {
        document.getElementById("movieForm").reset(); // Resets the entire form
        alert('Campos borrados correctamente.');
    };

    button.addEventListener("click", handler);
    buttonBorrar.addEventListener("click", buttonLimpiar);
};

export default createMovie;


