// import mongoose from "mongoose";

// export const connectDatabase = () => {
//   let DB_URI = "";

//   if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
//   if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

//   mongoose.connect(DB_URI).then((con) => {
//     console.log(
//       `MongoDB Database connected with HOST: ${con?.connection?.host}`
//     );
//   });
// };

import mongoose from "mongoose";

export const connectDatabase = async () => {
  const DB_URI = process.env.DB_URI || process.env.DB_LOCAL_URI;

  if (!DB_URI) {
    console.error("FATAL: No database URI provided.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `MongoDB connected in ${process.env.NODE_ENV} mode: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
