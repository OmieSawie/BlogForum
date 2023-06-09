const emailFormat =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty!";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty!";
  } else if (!email.match(emailFormat)) {
    errors.email = "Email must be a valid email format";
  }
  if (password.trim === "") {
    errors.password = "Enter a valid password!";
  } else if (password != confirmPassword) {
    errors.confirmPassword = "Passwords do not match!";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty!";
  }
  if (password.trim() === "") {
    errors.username = "Password must not be empty!";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
