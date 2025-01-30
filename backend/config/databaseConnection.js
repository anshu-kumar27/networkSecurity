const mongoose = require("mongoose");

const databaseConnection = () => {
  dbUrl = process?.env?.MONGODBURL ?? "mongodb://localhost:27017/security";
  mongoose
    .connect(dbUrl)
    .then((data) => {
      console.log(`db connected on : ${dbUrl}`);
    })
    .catch((error) => {
      console.log(`error while connecting the db ${error}`);
    });
};

module.exports = databaseConnection;
