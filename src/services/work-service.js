const prisma = require("../models/prisma");

exports.createWork = (data) => prisma.work.create({ data });

exports.findWorkById = (id) => prisma.work.findUnique({ where: { id } });

exports.findWorkByWorkIdAndPhotographerId = (id, photographerId) =>
  prisma.work.findFirst({
    where: {
      id,
      photographerId,
    },
  });

exports.findWorkAndWorkImageAndWorkRequestAndUserById = (id) =>
  prisma.work.findUnique({
    where: { id },
    include: {
      workImages: true,
      user: true,
      workRequests: true,
    },
  });

exports.findAllWorks = () =>
  prisma.work.findMany({
    where: {
      deletedAt: null,
      lastAvailableDate: {
        gt: new Date(),
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: true,
      workRequests: true,
    },
  });

exports.findWorksByPhotographerId = (photographerId) =>
  prisma.work.findMany({
    where: {
      photographerId,
      deletedAt: null,
    },
  });

exports.updateWorkByWorkId = (data, id) =>
  prisma.work.update({
    where: { id },
    data,
    include: {
      user: true,
      workRequests: true,
    },
  });

exports.deleteWorkByWorkId = (id, deletedAt) =>
  prisma.work.update({
    where: { id },
    data: {
      deletedAt,
    },
  });
