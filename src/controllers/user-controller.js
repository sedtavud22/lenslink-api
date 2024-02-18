const userService = require("../services/user-service");
const catchAsync = require("../utils/catch-async");
const createError = require("../utils/create-error");

exports.checkExistingUser = catchAsync(async (req, res, next) => {
  const existingUser = await userService.findUserById(+req.params.userId);
  if (!existingUser) {
    createError("no user found", 400);
  }
  req.targetUser = existingUser;
  next();
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await userService.findUserById(+req.params.userId);
  if (!user) {
    createError("no user found", 400);
  }

  res.status(200).json({ user });
});
