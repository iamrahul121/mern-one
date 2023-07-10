const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connection Sucessfull"))
    .catch(() => console.log("No Connection"));
};

module.exports = dbConnection;
