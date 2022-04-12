const About = require('../models/about')
const isEmpty = require('../validation/isEmpty');
const updateAbout = async (req, res) => {
    try {
        let error = {};

        if(isEmpty(req.body.richDescription)){
            error.richDescription = "Richdescription field is required."
            res.status(400).json(error);
        }
        await About.findByIdAndUpdate(id, {title:title}, {returnOriginal: false});
        res.status(200).json({success: true});

    } catch (err) {
        res.status(500).json({message:"Can't update about content"});
    }
}


module.exports = {
    updateAbout  
}