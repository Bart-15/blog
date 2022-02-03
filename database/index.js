const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//begin
const connectionURI = process.env.MONGODB_URI;

// I'm using node version 2.2.12 or later, but you can use the latest version (4.0 or later) if you've already install the latest version of node js


// mongoose.connect(mongoURI)
mongoose.connect(connectionURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Database connected successfully!");
}).catch(error => console.error(error))