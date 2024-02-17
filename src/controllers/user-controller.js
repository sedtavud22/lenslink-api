const userService = require("../services/user-service");
const catchAsync = require("../utils/catch-async");

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await userService.findUserById(+req.params.userId);
  res.status(200).json({ user });
});
