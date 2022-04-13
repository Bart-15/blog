require('../database')
const About = require('../models/about')
const mongoose = require('mongoose');

//Drop first the collection
About.collection.drop();


// create dummy data
const data = [
    new About(
        {
            titleDescription:"Test the seeder",
            richDescription:"<p>Hello test about    </p>"
        }
    )
]


let count = 0;

for(let i = 0; i < data.length; i++){
    count++;
    data[i].save(() => {21
        if(count === data.length){  
            console.log("About us seed successfully");
            closeConnection();
        }
    })
}

const closeConnection = () => {
    return mongoose.disconnect();
}

