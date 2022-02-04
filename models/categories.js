const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategoriesSchema = new Schema({
    title : {
        type:String,
        required: true
    },
    isCreated : {
        type:Date,
        required: true,
        default: Date.now()
    }
})


const Category = mongoose.model('categories', CategoriesSchema);

module.exports = Category;