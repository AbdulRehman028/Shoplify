import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// 1. Load config
dotenv.config({ path: "backend/config/config.env" });

// 2. Configure using your dashboard values
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3. The Helper Function
export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return reject(error); // This stops the "Uploading..." hang
        }

        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
    );
  });
};

export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);
  if (res?.result === "ok") return true;
};
