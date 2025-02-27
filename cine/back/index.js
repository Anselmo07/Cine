const app = require("./src/server");
const conDb = require("./src/config/conDb");


conDb().then(() => {
    app.listen(3000 , () => {
        console.log("próximamente estarán disponibles los datos de películas");
    });
}).catch(err => {
    console.log("Error al conectar la base de datos", err);
});

    