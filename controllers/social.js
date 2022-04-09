const Social = require('../models/social')
const validateSocialInputs = require('../validation/socialLinks')


const createSocialLinks = async (req, res) => {   
    const {errors, isValid} = validateSocialInputs(req.body);

    if(!isValid) return res.status(400).send(errors);
    
    try {
        const newSocialLinks = await new Social(req.body);
        await newSocialLinks.save();

        res.status(200).json({
            message:"Social links created successfully."
        })

    }catch(e) {
        res.status(400).json({
            success:false,
            error:"Can't create social links"
        })
    }
}

const getSocialLinks = async (req, res) => {
    try {
       const socialLinks = await Social.find({});
       res.status(200).json(socialLinks)
    }catch(e){
        res.status(500).send("Can't get social links.")
    }
}

const updateSocialLinks = async (req, res) => {
    try {
        // const socials = await Social.findById(req.params.id);
        const {errors, isValid} = validateSocialInputs(req.body);
        if(!isValid) {
            return res.status(400).json(errors)
        }

        const social = await Social.findByIdAndUpdate({_id:req.params.id}, req.body, {returnOriginal: false})
        if(!social) return res.status(400).json({message:"Can't update"});

        await social.save();
        res.status(200).json({
            success:true,
            message:"Social links updated successfully."
        })


    }catch(e){
        res.status(400).json("Can't update social links.");
    }
}



module.exports = {
    createSocialLinks,
    getSocialLinks,
    updateSocialLinks
}