import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
  _cloudinary.config({
    cloud_name: process.env.CLOUDINARYCLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET,
  });

  return _cloudinary;
};

export const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary().uploader.upload(file, { resource_type: "auto" }, (error, result) => {
      if (error) {
        return error;
      }
      // console.log(result);
      return result;
    }); // Menggunakan async/await
    return result; // Mengembalikan hasil unggahan
  } catch (error) {
    console.log(`Cloudinary upload failed: ${error.message}`); // Tangani error
  }
};
