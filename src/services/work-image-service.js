const prisma = require("../models/prisma");

exports.createWorkImage = (dataArray) =>
  prisma.workImage.createMany({
    data: dataArray,
  });
