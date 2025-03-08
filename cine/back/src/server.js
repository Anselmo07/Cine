const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Habilitar logging de peticiones HTTP
app.use(morgan("dev"));

// Configuración CORS para permitir solicitudes desde el dominio frontend
app.use(cors({
    origin: 'https://cine-atuxthdcx-anselmos-projects-96233391.vercel.app', // Especifica el origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Configuración de rutas
app.use(router);

module.exports = app;
