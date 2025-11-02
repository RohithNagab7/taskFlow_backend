const validator = require("validator");

const validateAgent = (data) => {
  const { email, name, password, mobileNumber } = data;
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid or missing email";
  }

  if (!mobileNumber || !/^\+\d{1,3}\d{7,14}$/.test(mobileNumber)) {
    errors.mobile = "Invalid mobile number (must include country code)";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = validateAgent;
