const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
    users :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    ], 
    latestMessage : {
        type: mongoose.Schema.Types.ObjectId,
       ref:'Message'
    },  
},{timestamps: true})

module.exports = mongoose.model('Chat', ChatSchema)

// timestamps will give updatedAt and createdAt