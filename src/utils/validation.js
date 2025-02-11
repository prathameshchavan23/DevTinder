const validator = require("validator");

const validateSignUpdate = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter your first name and last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedField = [
    "firstName",
    "lastName",
    "emailId",
    "photoURL",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedField.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpdate , validateEditProfileData };
