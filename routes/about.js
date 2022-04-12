const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    updateAbout
} = require("../controllers/about")

// @route    /about
// @desc     create about-us data
// @access   Private

router.patch('/about/:id', passport.authenticate('jwt', {session:false}), updateAbout)

module.exports = router;