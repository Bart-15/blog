const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    richDescription: {
        type: String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    isApproved : {
        type:Boolean,
        default: false
    },
    isCreated: {
        type:Date,
        default: Date.now()
    }    
})


const Post = mongoose.model('posts', PostSchema);
module.exports = Post;