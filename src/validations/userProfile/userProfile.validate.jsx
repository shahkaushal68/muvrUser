import { emailRegex } from "../../regexs";

export const validateCreateProfile = (name, value) => {
  let errors = {};

  switch (name) {
    case "firstName":
      if (value === null || value === "" || value === undefined) {
        errors.firstName = "Please enter first name.";
      }

      break;
    case "lastName":
      if (value === null || value === "" || value === undefined) {
        errors.lastName = "Please enter last name.";
      }
      break;
    case "email":
      if (value === null || value === "" || value === undefined) {
        errors.email = "Please enter email.";
      }

      if (value) {
        if (!emailRegex.test(value)) {
          errors.email = "Invalid email address.";
        }
      }
      break;
    case "phoneNumber":
      if (value === null || value === "" || value === undefined) {
        errors.phoneNumber = "Please enter phone number.";
      }
      if (value) {
        if (value?.toString()?.length < 4) {
          errors.phoneNumber = "Not allow less than 4 digits.";
        }
        if (value?.toString()?.length > 13) {
          errors.phoneNumber = "Not allow more than 13 digits.";
        }
      }
      break;
    case "address":
      if (value === null || value === "" || value === undefined) {
        errors.address = "Please select location.";
      }
      break;
    default:
      break;
  }
  return { errors };
};
export const validateSubmitCreateProfile = (userData, addressLocation) => {
  let errors = {};
  let valid = true;

  if (userData?.firstName === null || userData?.firstName === "" || userData?.firstName === undefined) {
    errors.firstName = "Please enter first name.";
  }

  if (userData?.lastName === null || userData?.lastName === "" || userData?.lastName === undefined) {
    errors.lastName = "Please enter last name.";
  }

  if (userData?.email === null || userData?.email === "" || userData?.email === undefined) {
    errors.email = "Please enter email.";
    valid = false;
  }

  if (userData?.email) {
    if (!emailRegex.test(userData?.email)) {
      errors.email = "Invalid email address.";
    }
  }

  if (userData?.phoneNumber === null || userData?.phoneNumber === "" || userData?.phoneNumber === undefined) {
    errors.phoneNumber = "Please enter phone number.";
    valid = false;
  }

  if (userData?.phoneNumber) {
    if (userData?.phoneNumber?.toString()?.length < 4) {
      errors.phoneNumber = "Invalid phone number.";
      valid = false;
    }
    if (userData?.phoneNumber?.toString()?.length > 13) {
      errors.phoneNumber = "Invalid phone number.";
      valid = false;
    }
  }

  if (userData?.email) {
    if (!emailRegex.test(userData?.email)) {
      errors.email = "Invalid email address.";
      valid = false;
    }
  }

  if (addressLocation === null || addressLocation === "" || addressLocation === undefined) {
    errors.address = "Please select location.";
  }

  return { errors, valid };
};

export const validateEditProfile = (name, value) => {
  let errors = {};

  switch (name) {
    case "first_name":
      if (value === null || value === "" || value === undefined) {
        errors.first_name = "Please enter first name.";
      }

      break;
    case "last_name":
      if (value === null || value === "" || value === undefined) {
        errors.last_name = "Please enter last name.";
      }
      break;

    default:
      break;
  }
  return { errors };
};
export const validateSubmitEditProfile = (userData) => {
  let errors = {};
  let valid = true;

  if (userData?.first_name === null || userData?.first_name === "" || userData?.first_name === undefined) {
    errors.first_name = "Please enter first name.";
  }

  if (userData?.last_name === null || userData?.last_name === "" || userData?.last_name === undefined) {
    errors.last_name = "Please enter last name.";
  }

  return { errors, valid };
};
