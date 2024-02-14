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

  const workData = { ...req.body, photographerId: req.user.id };

  const newWork = await workService.createWork(workData);

  const imgData = [];
  for (const file of req.files) {
    const result = await uploadService.upload(file.path);
    imgData.push({
      imageName: file.filename.split(".")[0],
      imageUrl: result,
      workId: newWork.id,
    });
    fs.unlink(file.path);
  }

  await workImageService.createWorkImage(imgData);

  const work = await workService.findWorkAndWorkImageByWorkId(newWork.id);
  res.status(201).json({ work });
});

exports.getAllWorks = catchAsync(async (req, res, next) => {});
