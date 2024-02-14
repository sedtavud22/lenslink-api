const createError = require("../../utils/create-error");

exports.validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    throw error;
  }
  req.body = value;
  next();
};

exports.validateImage = (req, res, next) => {
  const { files } = req;

  if (!files) {
    createError("At least one image is required", 400);
  }
  next();
};
