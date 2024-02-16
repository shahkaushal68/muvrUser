export const validateZipCode = (value, previousErrors = {}) => {
    let errors = { ...previousErrors };
    if (!value) {
        errors.zipCode = "Please Enter the Zipcode";
    } else if (value?.length < 4) {
        errors.zipCode = "Zipcode value is atleast 4 digit";
    } else {
        delete errors.zipCode
    }
    return { errors };
};


export const validateBringHomeTown = (zipCode) => {
    let errors = {};
    if (!zipCode) {
        errors.zipCode = "Please Enter Zipcode!";
    }
    return { errors };
};