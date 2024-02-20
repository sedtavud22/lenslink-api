const fs = require("fs/promises");

const userService = require("../services/user-service");
const catchAsync = require("../utils/catch-async");
const createError = require("../utils/create-error");
const uploadService = require("../services/upload-service");
const destroyService = require("../services/destroy-service");

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
  delete user.password;

  res.status(200).json({ user });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.file) {
    const { profileImagePublicKey } = await userService.findUserById(
      req.user.id
    );

    const profileImageUpload = await uploadService.upload(req.file.path);
    req.body.profileImage = profileImageUpload.secure_url;
    req.body.profileImagePublicKey = profileImageUpload.public_id;
    await destroyService.destroy(profileImagePublicKey);
    fs.unlink(req.file.path);
  }

  const user = await userService.updateUserById(req.body, req.user.id);
  delete user.password;
  res.status(200).json({ user });
});
