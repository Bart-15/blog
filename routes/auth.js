const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    signup,
    login, 
    profile,
    logout
} = require('../controllers/auth');


// @route    /signup
// @desc     register new user
// @access   Public
//  Temporary
router.post('/signup', signup);

// @route    /login
// @desc     login user
// @access   Public
router.post('/login', login);

// @route    /profile
// @desc     get the profile 
// @access   Private
router.get('/profile', passport.authenticate('jwt',  {session:false}), profile);


// @route    /logout
// @desc     logout user
// @access   Private
router.post('/logout', passport.authenticate('jwt', {session:false}), logout)

module.exports = router;

    