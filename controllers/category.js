const Category = require('../models/categories')
require('../database')

const createCategory = async(req, res) => {
    try {
        const title = req.body.title;
        if(!title){
            return res.status(400).json({message:"Title field is required."})
        }

        const newCategory = {title: title};
        const category = await new Category(newCategory);
        await category.save();
        res.status(200).json({success:true, message:"Category created successfully."})

    }catch(e) {
        res.status(500).send("Server Error");
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

const deleteCategories = async () => {
    res.send("Listening....")
}
module.exports = {
    createCategory,
    getCategories,
    deleteCategories
}