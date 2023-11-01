const mongoose = require("mongoose")

const PlaceSchema = new mongoose.Schema({
    place : {type: String}  
},{timestamps: true})

module.exports = mongoose.model('Place', PlaceSchema)

// timestamps will give updatedAt and createdAt