const mongoose = require('mongoose');
require('../database');
const Category = require('../models/categories');

//Drop first the collection
Category.collection.drop();

let data = [
    {
        title:"Showbiz"
    },
    {
        title:"Tech"
    },
    {
        title:"Politics"
    },
    {
        title:"War"
    }
]


//Drop first the collection
Category.collection.drop();

const closeConnection = async () => {
    return await mongoose.disconnect();
}

const categorySeeder = async () => {
    try {
        console.log("Seeding...")
        await Category.insertMany(data)
        console.log("In progress 🚧")
        closeConnection();
        console.log("Success ✔️")
    } catch(err){
        console.log(err);
    }
}

categorySeeder();
