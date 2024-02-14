const cloudinary = require("../config/cloudinary");

exports.destroy = async (publicKey) => {
  try {
    const res = await cloudinary.uploader.destroy(publicKey);
    console.log(res);
    return res;
  } catch (error) {
    console.log("Destroy error", error);
  }
};

exports.destroyMany = async (publicKeyArray) => {
  try {
    const res = await cloudinary.api.delete_resources(publicKeyArray);
    console.log(res);
    return res;
  } catch (error) {
    console.log("Destroy error", error);
  }
};
