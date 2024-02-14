const cloudinary = require("../config/cloudinary");

exports.destroy = async (publicKeyArray) => {
  try {
    const res = await cloudinary.api.delete_resources(publicKeyArray);
    console.log(res);
    return res;
  } catch (error) {
    console.log("Destroy error", error);
  }
};
