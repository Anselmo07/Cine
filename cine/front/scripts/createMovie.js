const axios = require("axios"); // Asegúrate de que axios esté incluido en tu bundle

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
    
    /* --------- Handler --------- */

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
        titleInput.value = "";
        yearInput.value = "";
        directorInput.value = "";
        durationInput.value = "";
        genreInput.value = "";
        rateInput.value = "";
        posterInput.value = "";
        document.getElementById("movieForm").reset();
        alert('Campos borrados correctamente.'); 
    };
    
    button.addEventListener("click", handler);
    buttonBorrar.addEventListener("click", buttonLimpiar);
};

module.exports = createMovie;

