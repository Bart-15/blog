const express = require('express');
const router = express.Router();
const passport = require('passport')


const {
    getSocialLinks,
    updateSocialLinks
} = require('../controllers/social')


// @route    /socials
// @desc     display social links
// @access   Public
router.get('/socials', getSocialLinks);


// @route    /socials/:id
// @desc     update social links
// @access   private
router.patch('/socials/:id',  passport.authenticate('jwt',  {session:false}), updateSocialLinks);



module.exports = router;