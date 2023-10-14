const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    mobile :{
        type: String,
        
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    displayPic :[{
        type: String,
        default: '',}
    ],
    backgroundImg :{
        type: String,
        default: '',
    },
    password : {
        type: String,
        min: 6,
    },
    isBlocked : {
        type: Boolean,
        default:false,

    }   
},{timestamps: true})

module.exports = mongoose.model('User', UserSchema)

// timestamps will give updatedAt and createdAt