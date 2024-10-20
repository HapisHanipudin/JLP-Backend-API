import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
  _cloudinary.config({
    cloud_name: process.env.cloudinaryCloudName,
    api_key: process.env.cloudinaryApiKey,
    api_secret: process.env.cloudinaryApiSecret,
  });

  return _cloudinary;
};

export const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary().uploader.upload(file); // Menggunakan async/await
    return result; // Mengembalikan hasil unggahan
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`); // Tangani error
  }
};
