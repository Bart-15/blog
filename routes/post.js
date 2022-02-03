const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
    createPost
} = require('../controllers/post')


router.post('/post', createPost)


module.exports = router;
