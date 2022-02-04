const Post =  require('../models/posts');
require('../database')

const createPost = async (req, res) => {
    console.log(req.user)
}

module.exports = {
    createPost
} 