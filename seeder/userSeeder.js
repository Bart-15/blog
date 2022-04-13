require('../database');
const mongoose = require('mongoose');
const User = require('../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');


//Drop first the collection
User.collection.drop();

const closeConnection = async () => {
    return await mongoose.disconnect();
}

const userSeeder = async () => {
    console.log("Seeding...")
    try {
        let password = "superUser123"
        const hashedPass = await bcrypt.hash(password, 10)
        const image =  gravatar.url("newuser@mail.com", {protocol: 'https',s: '200', r: 'pg', d:'mm'})

        const user = await new User({
            name: "New User",
            email: "newuser@mail.com",
            image,
            password: hashedPass
        })
        console.log("In progress 🚧")
        await user.save();
        closeConnection();
        console.log("Success ✔️")

    } catch(err) {
        console.log(err);
    }
}

userSeeder();