// validateSubmitLogin
export const validateNextLoginForJunkRemoval = (location) => {
    let errors = {};
    if (!location?.pickUpLocation) {
        errors.pickUpLocation = "Please enter Pickup location";
    }
    return { errors };
};