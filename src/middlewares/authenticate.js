const catchAsync = require("../utils/catch-async");
const createError = require("../utils/create-error");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = catchAsync(async (req, res, next) => {
  console.log("HHHIHI");
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    createError("invalid authorization header", 401);
  }

  const token = authorization.split(" ")[1];
  const decodedPayload = jwtService.verify(token);
  console.log("HIHI");
  const user = await userService.findUserById(decodedPayload.userId);
  console.log("HIHI2");
  if (!user) {
    createError("user not found", 401);
  }

  delete user.password;
  req.user = user;
  next();
});

module.exports = authenticate;
