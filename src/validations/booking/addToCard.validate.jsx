export const validateOnChangeAddToCard = (name, value) => {
    let errors = {};
    switch (name) {
        case 'cardHolderName':
            if (!value) {
                errors.cardHolderName = "Please Enter Card Holder Name";
            }
            break;
        case 'cardNumber':
            if (!value) {
                errors.cardNumber = "Please Enter Card Number";
            } else if (!/^[0-9]+$/.test(value)) {
                errors.cardNumber = "Please Enter Only Numeric Value";
            }
            break;
        case 'expDate':
            if (!value) {
                errors.expDate = "Please Enter expire date";
            }
            break;
        case 'cvc':
            if (!value) {
                errors.cvc = "Please Enter last digti CVC Number";
            }
            break;
        case 'zipCode':
            if (!value) {
                errors.zipCode = "Please Enter Zipcode";
            }
            break;
        default:
            break;
    }
    return { errors };
};



export const validateOnclickAddCardButton = (cardDetails) => {

    console.log("cardDetails------", cardDetails);

    let errors = {};
    if (!cardDetails?.cardHolderName) {
        errors.cardHolderName = "Please Enter Card Holder Name";
    }
    if (!cardDetails?.cardNumber) {
        errors.cardNumber = "Please Enter Card Number";
    }
    if (!cardDetails?.expDate) {
        errors.expDate = "Please Enter expire date";
    }
    if (!cardDetails?.cvc) {
        errors.cvc = "Please Enter last digti CVC Number";
    }
    if (!cardDetails?.zipCode) {
        errors.zipCode = "Please Enter Zipcode";
    }
    return { errors };
};
