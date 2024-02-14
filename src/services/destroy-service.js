const cloudinary = require("../config/cloudinary");

exports.destroy = async (prefix) => {
  try {
    const res = await cloudinary.api.delete_resources_by_prefix(prefix);
    console.log(res);
    return res;
  } catch (error) {
    console.log("Destroy error", error);
  }
};
