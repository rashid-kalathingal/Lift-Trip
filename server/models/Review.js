const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    Rider : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Driver : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isRider : {
        type: Boolean,
       
    },
    isDriver : {
        type: Boolean,
       
    },
    star : { 
        type: Number,
        
    },
    review : {
        type: String,
        
    },
      
},{timestamps: true})

module.exports = mongoose.model('Review', ReviewSchema)

// timestamps will give updatedAt and createdAt