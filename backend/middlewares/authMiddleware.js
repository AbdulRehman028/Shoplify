import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

    if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

  next();
});


// Middleware to check if the user has admin role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next( new ErrorHandler(`${req.user.role} Role is not allowed to access this resource`, 403) );
    } 
    next();
  };
};