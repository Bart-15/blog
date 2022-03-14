const ObjectId = require('mongoose').Types.ObjectId;
const Category = require('../models/categories')
require('../database')

const createCategory = async(req, res) => {
    try {
        let errors = {};
        const title = req.body.title;
        if(!title){
            errors.title = "Title field is required."
            return res.status(400).json(errors); 
        }

        const newCategory = {title: title};
        const category = await new Category(newCategory);
        await category.save();
        res.status(200).json({success:true, message:"Category created successfully."})

    }catch(e) {
        res.status(500).send({message: "Server Error"});
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        if(categories.length < 0) {
            return res.status(404).json({message:"No categories to show."})
        }

        res.status(200).json({
            success: true,
            categories
        })

    }catch(e) {
        res.status(500).send("Can't get categories.")
    }
}

const deleteCategories = async (req, res) => {
    // check if the category/:id is valid
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid category id"});
    }
    try {
        const category = await Category.findById(req.params.id);
        if(!category) {
           return res.status(404).json({message: "Category not found"});
        }

         await Category.findByIdAndDelete(req.params.id);
         res.status(200).json({message: "Category deleted successfully."})    
    }catch(e) {
        res.satus(500).send("Can't delete categories.")
    }
}

const updateCategory = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    // check if the category/:id is valid
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid category id"});
    }

    try {
        if(!title) {
            return res.status(400).json({message:"Title field is required."})
        }
         await Category.findByIdAndUpdate(id, {title:title}, {returnOriginal: false});
         res.status(200).json({success: true});
    }catch(e) {
         res.satus(500).send("Can't update categories");
    }
}

const getSingleCategory = async (req, res) => {
     // check if the category/:id is valid
     if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "Invalid category id"});
    }

    try {
        const category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }

        res.status(200).json({
            success:true, 
            category
        })

    }catch(e){
        res.status(500).json("Can't get category.")
    }
}


module.exports = {
    createCategory,
    getCategories,
    deleteCategories,
    updateCategory,
    getSingleCategory  
}