const express = require('express');
const router = express.Router();
const passport = require('passport');

const multer = require('multer');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
  };

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid image type");

        if(isValid) {
            error = null
        }

        cb(error, 'public/uploads')
    },
    filename : function(req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${ext}`)
    }
})

const uploadOptions = multer({storage: storage})


const {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    updateFeatured
} = require('../controllers/post');
const { update } = require('../models/posts');




// @route    /posts
// @desc     create post
// @access   Private
router.post('/posts', passport.authenticate('jwt',{ session:false }), uploadOptions.single('image'), createPost)


// @route    /posts
// @desc     get all posts
// @access   Public
router.get('/posts', getAllPost)


// @route    /posts
// @desc     get single post
// @access   Public
router.get('/posts/:id', getSinglePost)


// @route    /posts/:id
// @desc     update posts
// @access   Private
router.patch('/posts/:id', passport.authenticate('jwt', {session:false}),  uploadOptions.single('image'), updatePost)


// @route    /posts/featured/:id
// @desc     update posts isFeatured
// @access   Private
router.patch('/posts/featured/:id', passport.authenticate('jwt', {session:false}), updateFeatured)

module.exports = router;
