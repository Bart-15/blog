const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
    createCategory,
    getCategories,
    deleteCategories,
    updateCategory,
    getSingleCategory
}  = require('../controllers/category')


// @route    /categories
// @desc     create category
// @access   Private
router.post('/categories', passport.authenticate('jwt', {session:false}), createCategory)

// @route    /categories/:id
// @desc     delete single category
// @access   Private
router.delete('/categories/:id', passport.authenticate('jwt', {session:false}), deleteCategories)


// @route    /categories
// @desc     get all categories
// @access   Public
router.get('/categories', getCategories)

// @route    /categories/:id
// @desc     update category
// @access   Private
router.patch('/categories/:id', passport.authenticate('jwt', {session:false}), updateCategory)

// @route    /categories/:id
// @desc     get single category
// @access   Public
router.get('/categories/:id', getSingleCategory)


module.exports = router;
