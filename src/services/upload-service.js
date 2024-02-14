const cloudinary = require("../config/cloudinary");

exports.upload = async (path) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(path, {
      use_filename: true,
    });
    return secure_url;
  } catch (error) {
    console.log("upload error", error);
  }
};
