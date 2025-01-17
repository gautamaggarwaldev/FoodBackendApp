const mongoose = require('mongoose');
const serverConfig = require('./serverConfig.js')

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL)
        console.log("Connected to the database successfully...");
    }
    catch(error) {
        console.log(error);
        console.log("Unable to connect with the database server");
    }
}

module.exports = connectDB;