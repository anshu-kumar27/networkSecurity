const express = require("express");
const {
  uploadAPassword,
  updatePassword,
  deletePassword,
} = require("../controller/passwordController");
const router = express.Router();

//ready
// Routes for password operations

router.route("/api/addpassword").post(uploadAPassword); // addition of passwords
router.route("/api/updatepassword").put(updatePassword); // Update password
router.route("/api/deletepassword").delete(deletePassword); // Delete password

module.exports = router;
