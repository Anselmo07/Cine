const app = require("./src/server");
const conDb = require("./src/config/conDb");

const PORT = process.env.PORT || 3000;

conDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT} - próximamente estarán disponibles los datos de películas`);
    });
}).catch(err => {
    console.log("Error al conectar la base de datos", err);
});