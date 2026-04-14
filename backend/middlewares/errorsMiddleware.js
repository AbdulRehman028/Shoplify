// import ErrorHandler from "../utils/errorHandler.js";

// export default (err, req, res, next) => {
//   let error = {
//     statusCode: err?.statusCode || 500,
//     message: err?.message || "Internal Server Error",
//   };

//   // Handle Mongoose bad ObjectId error
//   if (err.name === "CastError") {
//     error.message = `Resource not found. Invalid: ${err?.path}`;
//     error = new ErrorHandler(error.message, 400);
//   }

//   // Handle Validation Error
//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors).map((value) => value.message);
//     error = new ErrorHandler(message, 400);
//   }

//   // Handle Developer errors in development environments
//   if (process.env.NODE_ENV === "DEVELOPMENT") {
//     res.status(error.statusCode).json({
//       message: error.message,
//       error: err,
//       stack: err?.stack,
//     });
//   }
  
//   // Handle Mongose duplicate key Error
//   if (err.code === 11000) {
//     const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
//     error = new ErrorHandler(message, 400);
//   }
//   // Handle errors in production environments
//   if (process.env.NODE_ENV === "PRODUCTION") {
//     res.status(error.statusCode).json({
//       message: error.message,
//     });
//   }
// };


import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handle Mongoose bad ObjectId error
  if (err.name === "CastError") {
    error = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  // Handle Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(message, 400);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ErrorHandler(`${field} already exists`, 400);
  }

  // Handle wrong JWt error
    if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again.";   
    error = new ErrorHandler(message, 400);
  }

  // Handle JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token has expired. Try again.";
    error = new ErrorHandler(message, 400);
  }

  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "DEVELOPMENT" && { stack: err.stack }),
  });
};
