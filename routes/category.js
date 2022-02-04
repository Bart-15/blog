const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
    createCategory,
    getCategories,
    deleteCategories
}  = require('../controllers/category')


// @POST
// /categories
// Private
router.post('/categories', passport.authenticate('jwt', {session:false}), createCategory)

// @DELETE
// /categories
// Private
router.delete('/categories/:id', passport.authenticate('jwt', {session:false}), deleteCategories)



// @POST
// /categories, get all categories
// Public
router.get('/categories', getCategories)
module.exports = router;
