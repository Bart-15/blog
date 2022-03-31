const validator = require('validator');
const isEmpty = require('./isEmpty');


const validateSocialInputs = (data) => {
    let errors = {};

    data.facebook = data.facebook ? data.facebook : "";
    data.twitter = data.twitter ? data.twitter : "";
    data.instagram = data.instagram ? data.instagram : "";
    data.youtube = data.youtube ? data.youtube : ""


    
    if(!validator.isURL(data.facebook)){
        errors.facebook = "Invalid URL."
    }

    if(!validator.isURL(data.twitter)){
        errors.twitter = "Invalid URL."
    }

    if(!validator.isURL(data.instagram)){
        errors.instagram = "Invalid URL."
    }

    if(!validator.isURL(data.youtube)){
        errors.youtube = "Invalid URL."
    }

    return {
        errors,
        isValid: isEmpty(errors)    
    }
}

module.exports = validateSocialInputs;