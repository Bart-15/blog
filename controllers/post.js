const Post =  require('../models/posts');
require('../database')

const createPost = async (req, res) => {
    res.send('Hello');
}

module.exports = {
    createPost
}