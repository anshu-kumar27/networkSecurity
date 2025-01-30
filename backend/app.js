const express = require("express");
const cors = require("cors");
const app = express();

// Use CORS middleware
app.use(cors());

// Your other middlewares and routes
app.use(express.json()); // important

const passwordRoutes = require("./routes/passwordRoutes");
app.use("/", passwordRoutes);

module.exports = app;
