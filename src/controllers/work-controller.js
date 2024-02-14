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

  const mainImgUpload = await uploadService.upload(req.files.mainImage[0].path);
  workData.mainImageUrl = mainImgUpload.secure_url;
  workData.mainImageKey = mainImgUpload.public_id;
  fs.unlink(req.files.mainImage[0].path);

  const newWork = await workService.createWork(workData);

  const imgData = [];

  if (req.files.subImages) {
    for (const file of req.files.subImages) {
      const result = await uploadService.upload(file.path);
      imgData.push({
        imageUrl: result.secure_url,
        publicKey: result.public_id,
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
