const mongoose = require("mongoose")

const ConnectionSchema = new mongoose.Schema({
    driverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    riderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    rideInfo : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Driver',
    },
    isConnected : {
        type: Boolean,
        default: false,
    },   
    rideComformed : {
        type: Boolean,
        default: false,
    },   
},{timestamps: true})

module.exports = mongoose.model('Connection', ConnectionSchema)

// timestamps will give updatedAt and createdAt