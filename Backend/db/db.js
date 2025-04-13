const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

function connecttoDB() {
    mongoose.connect(`${process.env.MONGO_URI}/Ambulance_Tracker`, {
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.error("Error connecting to MongoDB:", err.message);
    });
}

module.exports = connecttoDB;