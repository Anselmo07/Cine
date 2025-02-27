require("dotenv").config();
const mongoose = require("mongoose");

const conDb = async () => {
    await mongoose.connect("mongodb+srv://anselmo:chatbot@anselmo.2mlml.mongodb.net/movies?retryWrites=true&w=majority");
};

module.exports = conDb;