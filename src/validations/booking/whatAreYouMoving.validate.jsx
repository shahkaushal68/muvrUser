// validaSelecte Enter Instruction Location
export const validateSpecialInstruction = (value, previousErrors = {}) => {
  let errors = { ...previousErrors };
  value = value.trim();
  if (!value) {
    errors.specialInstruction = "Special instuctions are required";
  } else {
    delete errors.specialInstruction;
  }
  return { errors };
};

// validateSubmitLogin
export const whatAreYouMovingValidateNextLogin = (instructions) => {
  let errors = {};
  // console.log(instructions);
  instructions = instructions?.trim();
  if (!instructions) {
    errors.specialInstruction = "Special instuctions are required";
  }
  return { errors };
};
