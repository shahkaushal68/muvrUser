import { emailRegex } from "../../regexs";

// validateLogin
export const validateEmailLogin = (email, value) => {
  let errors = {};
  let valid = true;
  if (value === null || value === "" || value === undefined) {
    errors.email = "Please enter Email Id.";
    valid = false;
  }

  if (value) {
    if (!emailRegex.test(value)) {
      errors.email = "Invalid email address.";
      valid = false;
    }
  }
  return { errors, valid };
};

export const validatePhoneLogin = (name, value) => {
  let errors = {};
  let valid = true;
  if (value === null || value === "" || value === undefined) {
    errors.phoneNumber = "Please enter phone number.";
    valid = false;
  }

  if (value) {
    if (value?.toString()?.length < 4 || value?.toString()?.length > 13) {
      errors.phoneNumber = "Invalid phone number.";
      valid = false;
    }
    // else if (value?.toString()?.length > 13) {
    //   errors.phoneNumber = "Invalid phone number.";
    //   valid = false;
    // }
  }

  return { errors, valid };
};

// validateSubmitLogin
export const validateSubmitLogin = (loginData) => {
  let errors = {};
  let valid = true;
  if (loginData?.loginType === "email" || loginData?.changeType === "email") {
    if (loginData?.email === null || loginData?.email === "" || loginData?.email === undefined) {
      errors.email = "Please enter Email Id.";
      valid = false;
    }

    if (loginData.email) {
      if (!emailRegex.test(loginData?.email)) {
        errors.email = "Invalid email address.";
        valid = false;
      }
    }
  } else {
    if (loginData?.phoneNumber === null || loginData?.phoneNumber === "" || loginData?.phoneNumber === undefined) {
      errors.phoneNumber = "Please enter phone number.";
      valid = false;
    }

    if (loginData?.phoneNumber) {
      if (loginData.phoneNumber?.toString()?.length < 4 || loginData.phoneNumber?.toString()?.length > 13) {
        errors.phoneNumber = "Invalid phone number.";
        valid = false;
      }
      // else if (loginData.phoneNumber?.toString()?.length > 13) {
      //   errors.phoneNumber = "Invalid phone number.";
      //   valid = false;
      // }
    }
  }
  if (loginData?.loginType) {
    if (!loginData?.isAgreement) {
      errors.isAgreement = "Please checked agreement!";
      valid = false;
    }
  }

  return { errors, valid };
};

export const validateDeleteRequest = (name, value, loginType) => {
  let errors = {};
  switch (name) {
    case "email":
      if (loginType === "email") {
        if (value === null || value === "" || value === undefined) {
          errors.email = "This field is required.";
        }
      }
      if (value) {
        if (!emailRegex.test(value)) {
          errors.email = "Invalid email address.";
        }
      }

      break;

    case "phone":
      if (loginType === "phone") {
        if (value === null || value === "" || value === undefined) {
          errors.phone = "This field is required.";
        }
      }
      break;
    default:
      break;
  }
  return { errors };
};

// validateSubmitLogin
export const validateSubmitDeleteRequest = (loginData) => {
  let errors = {};
  let valid = true;
  if (loginData?.loginType === "phone") {
    if (loginData?.phone === null || loginData?.phone === "" || loginData?.phone === undefined) {
      errors.phone = "Please enter phone number.";
      valid = false;
    }

    if (loginData?.phone) {
      if (loginData.phone?.toString()?.length < 4) {
        errors.phone = "Invalid phone number.";
        valid = false;
      }
      if (loginData.phone?.toString()?.length > 13) {
        errors.phone = "Invalid phone number.";
        valid = false;
      }
    }
  } else {
    if (loginData?.email === null || loginData?.email === "" || loginData?.email === undefined) {
      errors.email = "Please enter Email Id.";
      valid = false;
    }

    if (loginData?.email) {
      if (!emailRegex.test(loginData?.email)) {
        errors.email = "Invalid email address.";
        valid = false;
      }
    }
  }

  return { errors, valid };
};
