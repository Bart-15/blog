const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SocialSchema = new Schema ({
    facebook: {
        type:String
    },
    instagram: {
        type:String,
    },
    twitter : {
        type:String,
    },
    youtube: {
        type:String
    },
})


const Social = mongoose.model('socials', SocialSchema);
module.exports = Social;