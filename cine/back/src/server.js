const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:8080', // Reemplaza con la URL de tu frontend
    optionsSuccessStatus: 200
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

module.exports = app;