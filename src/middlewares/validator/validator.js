const createError = require("../../utils/create-error");

exports.validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    throw error;
  }
  req.body = value;
  next();
};

exports.validateMainImage = (req, res, next) => {
  if (!req.files.mainImage) {
    createError("At least one image is required", 400);
  }
  next();
};
