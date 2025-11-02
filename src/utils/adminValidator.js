const validator = require("validator");

const validateAdminAuthForm = (reqBody) => {
  const { email, password } = reqBody;
  const errors = [];

  if (!email || !validator.isEmail(email)) {
    errors.push("Invalid email");
  }

  if (!password || password.lenght < 6) {
    errors.push("Invalid password");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateAdminAuthForm };
