require("dotenv").config();
const mongoose = require("mongoose");

const conDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        process.exit(1);
    }
};

module.exports = conDb;