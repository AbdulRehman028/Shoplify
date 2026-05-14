import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnects.js";
import productRoutes from "./routes/products.js"; 
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import errorMiddleware from "./middlewares/errorsMiddleware.js";

const app = express();

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});


// Load env vars
dotenv.config({ path: "backend/config/config.env" });


// Connect to database
connectDatabase();


// Middleware
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);


// Use error handling middleware
app.use(errorMiddleware);


// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`,
  );
});


// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down the server due to unhandled promise rejection.");
  server.close(() => {
    process.exit(1);
  });
});
