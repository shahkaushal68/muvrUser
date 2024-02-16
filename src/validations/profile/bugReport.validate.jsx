// onchange Validate bug report

export const validateSelectChange = (value, previousErrors = {}) => {
    let errors = { ...previousErrors };
    if (!value) {
        errors.bugType = "Please select type";
    }
    else {
        delete errors.bugType;
    }
    return { errors };
};

export const validateEnterText = (value, previousErrors = {}) => {
    let errors = { ...previousErrors };
    if (!value) {
        errors.description = "Please enter description";
    }
    else {
        delete errors.description;
    }
    return { errors };
};

export const validateUploadImage = (value, previousErrors = {}) => {
    let errors = { ...previousErrors };
    if (value?.length <= 0) {
        errors.uploadImage = "Please upload the image/video";
    }
    else {
        delete errors.uploadImage;
    }
    return { errors };
};

// validateSubmitBug Report
export const validateSubmitBugReport = (bugTypeData, uploadingImages) => {
    let errors = {};
    if (!bugTypeData?.type) {
        errors.bugType = "Please select type";
    }
    if (!bugTypeData?.description) {
        errors.description = "Please enter description";
    }
    if (uploadingImages?.length <= 0) {
        errors.uploadImage = "Please upload the image/video";
    }

    return { errors };
};
