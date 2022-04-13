const mongoose = require('mongoose');
require('../database');
const Social = require('../models/social');


//Drop first the collection
Social.collection.drop();

const closeConnection = async () => {
    return await mongoose.disconnect();
}

const socialSeeder = async () => {
    try {
        console.log("Seeding...")
        const data = {
            facebook:"https://www.facebook.com/",
            instagram:"https://www.instagram.com/",
            youtube:"https://www.youtube.com/",
            twitter:"https://twitter.com/"
        }
       const social =  await new Social(data);
       console.log("In progress 🚧")
       await social.save();
       closeConnection();
       console.log("Success ✔️")
    } catch(err) {
        console.log(err)
    }
}



socialSeeder();