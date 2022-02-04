const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
    createPost
} = require('../controllers/post')


router.post('/post', passport.authenticate('jwt',{ session:false }), createPost)


module.exports = router;
