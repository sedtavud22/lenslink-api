const { REQUEST_STATUS } = require("../constants");
const prisma = require("../models/prisma");

exports.checkExistingRequest = (clientId, workId) =>
  prisma.workRequest.findFirst({
    where: {
      clientId,
      workId,
      OR: [
        { status: REQUEST_STATUS.Pending },
        { status: REQUEST_STATUS.Ongoing },
      ],
    },
  });

exports.findOngoingAndCompletedRequestsDateByWorkId = (workId) =>
  prisma.workRequest.findMany({
    where: {
      workId,
      OR: [
        { status: REQUEST_STATUS.Ongoing },
        { status: REQUEST_STATUS.Completed },
      ],
    },
    select: {
      date: true,
    },
  });

exports.findPendingRequestByClientIdAndWorkId = (clientId, workId) =>
  prisma.workRequest.findFirst({
    where: {
      status: REQUEST_STATUS.Pending,
      clientId,
      workId,
    },
  });

exports.findPendingRequestByPhotographerIdAndWorkId = (
  photographerId,
  workId
) =>
  prisma.workRequest.findFirst({
    where: {
      status: REQUEST_STATUS.Pending,
      workId,
      work: {
        photographerId,
      },
    },
  });

exports.findOngoingRequestByClientIdAndWorkId = (clientId, workId) =>
  prisma.workRequest.findFirst({
    where: {
      status: REQUEST_STATUS.Ongoing,
      clientId,
      workId,
    },
  });

exports.createRequest = (data) => prisma.workRequest.create({ data });

exports.updateRequestStatus = (status, id) =>
  prisma.workRequest.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });
