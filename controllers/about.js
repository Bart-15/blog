const About = require('../models/about')
const isEmpty = require('../validation/isEmpty');
const updateAbout = async (req, res) => {
    try {
        let error = {};

        if(isEmpty(req.body.richDescription)){
            error.richDescription = "Richdescription field is required."
            res.status(400).json(error);
        }
        const {titleDescription, richDescription} = req.body;
        const about =  await About.findByIdAndUpdate({_id:req.params.id}, {titleDescription, richDescription}, {returnOriginal: false});
        await about.save();
        res.status(200).json({success: true});

    } catch (err) {
        res.status(500).json({message:"Can't update about content"});
    }
}


const getAbout = async (req, res) => {
    try{
       const about = await About.find({});
       res.status(200).send(about)

    } catch (err) {
        res.status(500).json({message:"Can't get about'"})
    }
}

module.exports = {
    updateAbout,
    getAbout  
}