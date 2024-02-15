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

exports.createRequest = (data) => prisma.workRequest.create({ data });
