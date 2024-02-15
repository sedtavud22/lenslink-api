const { USER_ROLE } = require("../../constants");
const createError = require("../../utils/create-error");

exports.validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    throw error;
  }
  req.body = value;
  next();
};

exports.validateCardImage = (req, res, next) => {
  if (!req.files.cardImage) {
    createError("At least one image is required", 400);
  }
  next();
};

exports.workIdValidator = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.params);
  if (error) {
    throw error;
  }
  req.workId = value.workId;
  next();
};

exports.validatePhotographer = (req, res, next) => {
  if (req.user.role !== USER_ROLE.Photographer) {
    createError("Only photographers are authorized", 403);
  }
  next();
};

exports.validateClient = (req, res, next) => {
  if (req.user.role !== USER_ROLE.Client) {
    createError("Only clients are authorized", 403);
  }
  next();
};
