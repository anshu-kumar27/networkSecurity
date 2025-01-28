const express = require('express');
const { uploadAPassword } = require('../controller/passwordController');
const router = express.Router();

//ready 
router.route('/addpassword').post(uploadAPassword); // addition of passwords

module.exports = router;