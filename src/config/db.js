const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo DB connection string is missing");
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to the DB ");
  } catch (err) {
    console.error("Mongo DB connection error: " + err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongo DB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("Mongo DB reconnected successfully");
  })
};

module.exports = connectDB;

