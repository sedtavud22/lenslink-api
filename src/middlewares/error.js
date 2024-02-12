const { ValidationError } = require("joi");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = (error, req, res, next) => {
  console.log(error);
  if (error instanceof ValidationError) {
    error.statusCode = 400;
  } else if (error instanceof TokenExpiredError) {
    error.statusCode = 401;
  } else if (error instanceof JsonWebTokenError) {
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({ message: error.message });
};
