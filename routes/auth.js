const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    login, 
    profile,
    logout,
    updateProfile,
    isAuth
} = require('../controllers/auth');




// @route    /login
// @desc     login user
// @access   Public
router.post('/login', login);

// @route    /profile
// @desc     get the profile 
// @access   Private
router.get('/profile', passport.authenticate('jwt',  {session:false}), profile);

// @route    /profile
// @desc     update profile info password set to optional; 
// @access   Private
router.patch('/profile', passport.authenticate('jwt',  {session:false}), updateProfile);

// @route    /logout
// @desc     logout user
// @access   Private
router.post('/logout', passport.authenticate('jwt', {session:false}), logout)

// @route    /isAuth
// @desc     check user authenticated
// @access   Private
router.get('/isAuth', passport.authenticate('jwt', {session:false}), isAuth)



module.exports = router;

    