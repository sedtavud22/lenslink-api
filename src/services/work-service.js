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
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

exports.findWorksByPhotographerId = (photographerId) =>
  prisma.work.findMany({
    where: {
      photographerId,
      deletedAt: null,
    },
  });
