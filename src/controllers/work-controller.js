const fs = require("fs/promises");

const catchAsync = require("../utils/catch-async");
const workService = require("../services/work-service");
const workImageService = require("../services/work-image-service");
const { USER_ROLE } = require("../constants");
const createError = require("../utils/create-error");
const uploadService = require("../services/upload-service");

exports.createWork = catchAsync(async (req, res, next) => {
  if (req.user.role !== USER_ROLE.Photographer) {
    createError("Only photographers can create work", 403);
  }
  console.log("hfdhhre");
  const imgData = [];
  for (const file of req.files) {
    const res = await uploadService.upload(file.path);
    imgData.push({ imageName: file.filename, imageUrl: res });
    fs.unlink(file.path);
    console.log("inloop", imgData);
  }

  console.log("outloop", imgData);
  // console.log("body", req.body);
  // console.log("file", req.files);
  // const workData = { ...req.body, photographerId: req.user.id };

  // const work = await workService.createWork(workData)
  // console.log('aftercreatework',work)

  // const workImg = await workImageService.createWorkImage()
});

exports.getAllWorks = catchAsync(async (req, res, next) => {});
