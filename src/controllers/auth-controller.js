const catchAsync = require("../utils/catch-async");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const { USER_GENDER, USER_ROLE } = require("../constants");

exports.register = catchAsync(async (req, res, next) => {
  if (!(req.body.role in USER_ROLE)) {
    createError("Invalid value for Role", 400);
  }

  if (!(req.body.gender in USER_GENDER)) {
    createError("Invalid value for Gender", 400);
  }

  const existingUser = await userService.findUserByEmail(req.body.email);
  if (existingUser) {
    createError("EMAIL_IN_USE", 400);
  }

  req.body.password = await hashService.hash(req.body.password);

  const user = await userService.createUser(req.body);
  delete user.password;
  res.status(201).json({ user });
});

exports.login = catchAsync(async (req, res, next) => {
  const existingUser = await userService.findUserByEmail(req.body.email);

  if (!existingUser) {
    createError("Invalid credentials", 400);
  }

  const isCorrectPassword = await hashService.compare(
    req.body.password,
    existingUser.password
  );

  if (!isCorrectPassword) {
    createError("Invalid credentials", 400);
  }

  const payload = { userId: existingUser.id };
  const accessToken = jwtService.sign(payload);
  delete existingUser.password;
  res.status(200).json({ accessToken, user: existingUser });
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
