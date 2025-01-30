const Password = require("./../model/password");

// this is to control the upload of passswords
exports.uploadAPassword = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    // Check if the name already exists
    const existingPassword = await Password.findOne({ name });

    if (existingPassword) {
      // If it exists, send an error message
      return res.status(400).json({
        message:
          "Password for this service already exists. You can update it instead.",
      });
    }
    // If it doesn't exist, create a new password

    const passwordmodel = await Password.create({
      name,
      password,
    });
    res.status(200).json({
      message: "Password uploaded successfully!",
      passwordmodel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading password" });
  }
};

// Update password
exports.updatePassword = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const updatedPassword = await Password.findOneAndUpdate(
      { name }, // Find the password by name
      { password }, // Update the password
      { new: true } // Return the updated document
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json({
      message: "Password updated successfully!",
      updatedPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating password" });
  }
};

// Delete password
exports.deletePassword = async (req, res, next) => {
  try {
    const { name } = req.body;
    const deletedPassword = await Password.findOneAndDelete({ name });

    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json({
      message: "Password deleted successfully!",
      deletedPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting password" });
  }
};
