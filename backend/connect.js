// this file is used to connect to the database

const mongoose = require('mongoose')

// the mongoose.connect(connectionString) returns a promise. 
const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB



