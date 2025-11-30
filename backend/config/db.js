const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // use the default options for modern mongoose
    await mongoose.connect("mongodb://localhost:27017/taskDB");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Database Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
