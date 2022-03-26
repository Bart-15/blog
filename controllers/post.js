const Post =  require('../models/posts');
const Category = require('../models/categories');
require('../database');


const createPost = async (req, res) => {
    //  check category id;
    let errors = {};

    const category = await Category.findById(req.body.category);
    if(!category) {
        return res.status(404).json({message:"Category not found"});
    }

    // check image
    if(!req.file) {
        errors.image = "Image field is required";
        return res.status(404).json(errors);
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    const imgName = `${basePath}${fileName}`;

    try {
        const post = await new Post({
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image : imgName,
            category: category._id,
            isFeatured: req.body.isFeatured
        })

        await post.save();
        res.status(200).json({success: true, message:"Post created successfully."})


    }catch(e) {
        res.send(500).json({ message:"Error creating post."})
    }

}

const getAllPost = async (req, res) => {
    let filter = {};


    try {
        if(req.query.category){
            filter = { category: req.query.category.split(",")}
        }
        const posts = await Post.find(filter).populate('category');
        res.status(200).json({
            succcess: true,
            posts
        })
    }catch(e){
        res.status(500).json({message:"Error getting all posts."})
    }
}

const getSinglePost = async (req, res) => {
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.status(400).json({message:"Invalid id"});
    // }   
    try {
        const post = await Post.findById(req.params.id).populate('category')

        if(!post) {
            return res.status(404).json({message:"Post not found."})
        }

        res.status(200).json({
            success: true,
            post
        })
    }catch(e){
        res.status(500).json({message:"Error getting post"})
    }
}


const updatePost = async (req, res) => {
    // check the category
    const category = await Category.findById(req.body.category);
    if(!category) {
        return res.status(400).json("Category id not found.")
    }
    
    // optional image update
    let imagePath;
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({message:"Post not found"});
    }

    if(req.file) {
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = post.image;
    }
    
    const updatedPost = {
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image : imagePath,
            category: req.body.category,
            isFeatured: req.body.isFeatured    
    }
    
    
    try {
        const post = await Post.findByIdAndUpdate({_id: req.params.id}, updatedPost, {returnOriginal:false});
        if(!post) {
            return res.status(404).json({
                message:"Post not found."
            })
        }

        await post.save();
        res.status(200).json({
            success: true,
            message: "Post saved successfully."
        })

    } catch(e){
        res.status(500).send("Can't update post")
    }
}

const updateFeatured = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({message:"Post not found."})
        }

        post.isFeatured = !post.isFeatured;
        await post.save();

        res.status(200).json({
            success:true,
            post
        })
    }catch(e){
        res.status(500).json("Can't update post.")
    }
}

const deletePost = async(req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Post deleted successfully."
        })
    }catch(e){
        res.status(500).json("Can't delete post.")
    }
}


module.exports = {
    createPost,
    getAllPost,
    getAllPost,
    getSinglePost,
    updatePost,
    updateFeatured,
    deletePost  
} 