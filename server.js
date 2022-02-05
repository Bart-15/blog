const express = require('express');
const path = require('path');   
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
// port
require('dotenv').config({ path: './.env' })
const PORT = process.env.PORT || 3000;
const api = process.env.API

const auth = require('./routes/auth');
const post = require('./routes/post');
const category = require('./routes/category')

app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')))

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());


//route config
app.use(`${api}`, auth);
app.use(`${api}`, post);
app.use(`${api}`, category);



// passposrt
app.use(passport.initialize());
require('./auth/passport')(passport);



app.listen(PORT, ()=> {
    console.log("Listening on port:", PORT)
})



