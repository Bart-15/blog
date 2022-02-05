const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { 
        type:String,
        required: true
    },
    title : {
        type: String,
        reuired: true
    },
    description : {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image : {
        type: String,
        default:''
    },
    category : {
        type: Schema.Types.ObjectId,
        ref:'categories',
        required: true
    },
    isFeatured : {
        type:Boolean,
        required: true,
        default: false
    },
    isCreated: {
        type:Date,
        default: Date.now()
    }    
})


const Post = mongoose.model('posts', PostSchema);
module.exports = Post;