const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    updateAbout,
    getAbout
} = require("../controllers/about")

// @route    /about/:id
// @desc     update about data
// @access   Private
router.patch('/about/:id', passport.authenticate('jwt', {session:false}), updateAbout)


// @route    /about
// @desc     get about data
// @access   Private
router.get('/about', getAbout)


module.exports = router;