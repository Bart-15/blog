const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    signup,
    login, 
    profile,
    logout
} = require('../controllers/auth');


// @POST
// /signup
router.post('/signup', signup);


// @POST
// /login
router.post('/login', login);


// @GET
// /profile
router.get('/profile', passport.authenticate('jwt',  {session:false}), profile);


// @POST
// /logout
router.post('/logout', passport.authenticate('jwt', {session:false}), logout)

module.exports = router;

    