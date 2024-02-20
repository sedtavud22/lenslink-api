const prisma = require("../models/prisma");

exports.createWorkImage = (dataArray) =>
  prisma.workImage.createMany({
    data: dataArray,
  });

exports.findWorkImagesByArrayOfId = (idArray) =>
  prisma.workImage.findMany({ where: { id: { in: idArray } } });

exports.deleteWorkImagesByArrayOfId = (idArray) =>
  prisma.workImage.deleteMany({ where: { id: { in: idArray } } });
