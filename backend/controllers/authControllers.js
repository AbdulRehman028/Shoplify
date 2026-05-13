import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendtoken.js";
import sendEmail from "../utils/sendEmails.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import crypto from "crypto";

// Register a new user => /api/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);

});

// Login  a new user => /api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user has given email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);

});

// Logout user => /api/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

// Forget password => /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    console.log("BODY:", req.body);


  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user.name, resetPasswordUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }


});

// Reset password   =>  /api/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// get current user Profile  api/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req?.user?._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update password  api/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req?.user?._id).select("+password");

  // Check previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  // If previous password does not match, return error
  if (!isPasswordMatched) { return next(new ErrorHandler("Previous password is incorrect", 400)); }

  // Check if new password and confirm password match
  if (req.body.newPassword !== req.body.confirmPassword) { return next(new ErrorHandler("Passwords do not match", 400)); }

  // Set the new password
  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// Update user profile  api/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req?.user?._id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});


// Get all Users - Admin /api/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single User Details  - ADMIN /api/admin/user/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user details - ADMIN  api/admin/user/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// delete User  - ADMIN /api/admin/user/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new ErrorHandler("User not found with id " + req.params.id, 404));
  }

// Todo: remove avatar from cloudinary

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});