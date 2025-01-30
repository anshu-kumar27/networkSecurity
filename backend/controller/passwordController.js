const ErrorHandler = require("../middleware/ErrorHandler");
const Password = require("./../model/password");

// this is to control the upload of passswords
exports.uploadAPassword = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if(!name || !password){
      return next(new ErrorHandler("Either name or password is missing.",404));
    }

    // Check if the name already exists
    const existingPassword = await Password.findOne({ name });

    if (existingPassword) {
      return next(new ErrorHandler("Password for this service already exists. You can update it instead.",400))
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
    next(error);
  }
};

// Update password
exports.updatePassword = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if(!name || !password){
      return next(new ErrorHandler("Either name or password is missing.",404))
    }
    const updatedPassword = await Password.findOneAndUpdate(
      { name }, // Find the password by name
      { password }, // Update the password
      { new: true } // Return the updated document
    );

    if (!updatedPassword) {
      // return res.status(404).json({ message: "Password not found" });
      return next(new ErrorHandler("Password not found.",404))
    }

    res.status(200).json({
      message: "Password updated successfully!",
      updatedPassword,
    });
  } catch (error) {
    next(error);
  }
};

// Delete password
exports.deletePassword = async (req, res, next) => {
  try {
    const { name } = req.body;
    const deletedPassword = await Password.findOneAndDelete({ name });

    if (!deletedPassword) {
      // return res.status(404).json({ message: "Password not found" });
      return next(new ErrorHandler("Password not found.",404))
    }

    res.status(200).json({
      message: "Password deleted successfully!",
      deletedPassword,
    });
  } catch (error) {
    next(error);
  }
};

//get all passwords 
exports.findallpassword = async (req, res, next) => {
  try {
    const passwords = await Password.find();
    res.status(200).json({
      message: "all passwords fetched successfully!",
      data : passwords
    });
  } catch (error) {
    next(error);
  }
};
