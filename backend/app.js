const express = require('express')
const app = express();
app.use(express.json()); // important

const passwordRoutes = require('./routes/passwordRoutes');
app.use('/',passwordRoutes)

module.exports = app;