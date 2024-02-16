export const validatePickupLocation = (value, previousErrors = {}) => {
    let errors = { ...previousErrors };
    if (!value) {
        errors.originAddress = "Please Enter Pickup location!";
    } else {
        delete errors.originAddress
    }
    return { errors };
};

export const validateDropoffLocation = (value, previousErrors = {}) => {
    let errors = { ...previousErrors };
    if (!value) {
        errors.destinationAddress = "Please Enter Drop location!";
    } else {
        delete errors.destinationAddress
    }
    return { errors };
};

// validateSubmitLogin
export const validateNextLogin = (originAddress, destinationAddress) => {
    let errors = {};
    if (!originAddress) {
        errors.originAddress = "Please enter Pickup location";
    }
    if (!destinationAddress) {
        errors.destinationAddress = "Please enter Drop-off location";
    }
    return { errors };
};
