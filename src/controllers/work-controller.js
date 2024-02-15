const fs = require("fs/promises");

const catchAsync = require("../utils/catch-async");
const workService = require("../services/work-service");
const workImageService = require("../services/work-image-service");
const createError = require("../utils/create-error");
const uploadService = require("../services/upload-service");

exports.checkExistingWork = catchAsync(async (req, res, next) => {
  const existingWork = await workService.findWorkById(req.workId);
  if (!existingWork) {
    createError("work not found", 400);
  }

  req.targetWork = existingWork;
  next();
});

exports.createWork = catchAsync(async (req, res, next) => {
  const workData = { ...req.body, photographerId: req.user.id };

  const cardImgUpload = await uploadService.upload(req.files.cardImage[0].path);
  workData.cardImageUrl = cardImgUpload.secure_url;
  workData.cardImagePublicId = cardImgUpload.public_id;
  fs.unlink(req.files.cardImage[0].path);

  const newWork = await workService.createWork(workData);

  const imgData = [];

  if (req.files.subImages) {
    for (const file of req.files.subImages) {
      const result = await uploadService.upload(file.path);
      imgData.push({
        imageUrl: result.secure_url,
        publicId: result.public_id,
        workId: newWork.id,
      });
      fs.unlink(file.path);
    }
  }
  await workImageService.createWorkImage(imgData);

  const work = await workService.findWorkAndWorkImageByWorkId(newWork.id);
  res.status(201).json({ work });
});

exports.getAllWorks = catchAsync(async (req, res, next) => {
  const works = await workService.findAllWorks();
  res.status(200).json({ works });
});
