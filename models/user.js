const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name : {
        required:true,
        type:String
    }, 
    email : {
        required:true, 
        type:String
    },
    password : {
        required:true,
        type:String
    },
    role: {
        type:String,
        default:'user'
    },
    image : {
        type:String
    },
})

const User = mongoose.model('users', UserSchema);

module.exports = User;