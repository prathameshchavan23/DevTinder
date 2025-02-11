const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chavanprathamesh2303:Pratham123@newproj.64lud.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
