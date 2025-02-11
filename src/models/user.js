const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [30, "First name cannot exceed 30 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [30, "Last name cannot exceed 30 characters"],
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: String,
      min: [18, "You must be at least 18 years old"],
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender must be one of then");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL address" + value);
        }
      },
    },
    about: {
      type: String,
      default: "Default about of a User ",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// * this keyword is not used in arrow functions so we've used normal async function
userSchema.methods.getJWT = async function () {
  const user = this; //* this refers to the current user instance.
  const token = jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputbyUser) {
  const user = this;
  const passwordHash = user.password;
  // * It takes normal plain password and hashed/encrypted password to compare, don't change order of code
  const isPasswordValid = await bcrypt.compare(
    passwordInputbyUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
