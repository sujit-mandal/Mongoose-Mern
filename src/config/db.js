const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const e = require("express");

const connectDataBase = async (options={}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Connection established successfully with MongoDB");
    mongoose.connection.on("error", (error) => {
      console.error("Database connection error:", error);
    });
  } catch (error) {
    console.error(" Couldn't connect to MongoDB:", error.toString());
  }
};


module.exports = connectDataBase;