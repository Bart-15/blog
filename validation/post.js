const isEmpty = require('./isEmpty');

const validatePostInput = (data) =>{
    let errors = {};

    data.author = data.author ? data.author : "";
    data.title = data.title ? data.title :  "",
    data.description = data.description ? data.description : "",
    data.richDescription = data.richDescription ? data.richDescription : ""

    if(isEmpty(data.author)){
        errors.author = "Author field is required."
    }

    if(isEmpty(data.title)){
        errors.title = "Title field is required."
    }

    if(isEmpty(data.description)){
        errors.description = "Data field is required."
    }

    if(isEmpty(data.richDescription)){
        errors.richDescription = "Richdescription field is required."
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}

module.exports = validatePostInput;