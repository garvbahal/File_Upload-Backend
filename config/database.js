const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((error) => {
      console.log("DB Connection not successful");
      console.log(error);
      process.exit(1);
    });
};

module.exports = dbConnect;
