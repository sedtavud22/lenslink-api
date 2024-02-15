const prisma = require("../models/prisma");

exports.createWork = (data) => prisma.work.create({ data });

exports.findWorkById = (id) => prisma.work.findUnique({ where: { id } });

exports.findWorkAndWorkImageByWorkId = (id) =>
  prisma.work.findUnique({
    where: { id },
    include: {
      workImages: {
        where: {
          workId: id,
        },
      },
    },
  });

exports.findAllWorks = () =>
  prisma.work.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
