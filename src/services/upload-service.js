const cloudinary = require("../config/cloudinary");

exports.upload = async (path) => {
  try {
    const res = await cloudinary.uploader.upload(path, {
      use_filename: true,
    });
    return res;
  } catch (error) {
    console.log("upload error", error);
  }
};
