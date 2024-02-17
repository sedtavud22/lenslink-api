const { REQUEST_STATUS, USER_ROLE } = require("../constants");
const requestService = require("../services/request-service");
const userService = require("../services/user-service");
const workService = require("../services/work-service");
const catchAsync = require("../utils/catch-async");
const createError = require("../utils/create-error");
const {
  validateDateRange,
  validateEqualDate,
} = require("../utils/validate-date");

exports.sendRequest = catchAsync(async (req, res, next) => {
  const existingRequest = await requestService.checkExistingRequest(
    req.user.id,
    req.workId
  );
  if (existingRequest) {
    createError("Already have a request", 400);
  }

  const { firstAvailableDate, lastAvailableDate } =
    await workService.findWorkById(req.workId);

  const IsInDateRange = validateDateRange(
    req.body.date,
    firstAvailableDate,
    lastAvailableDate
  );

  if (!IsInDateRange) {
    createError("Requested Date not in work date range", 400);
  }

  const bookedDates =
    await requestService.findOngoingAndCompletedRequestsDateByWorkId(
      req.workId
    );

  if (bookedDates.length > 0) {
    for (const dateObj of bookedDates) {
      if (validateEqualDate(dateObj.date, req.body.date)) {
        createError("Date already booked", 400);
      }
    }
  }

  req.body = { ...req.body, clientId: req.user.id, workId: req.workId };
  const request = await requestService.createRequest(req.body);
  res.status(201).json({ request });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const pendingRequest =
    await requestService.findPendingRequestByPhotographerIdAndWorkId(
      req.user.id,
      req.workId
    );

  if (!pendingRequest) {
    createError("work request does not exist", 400);
  }

  const request = await requestService.updateRequestStatus(
    REQUEST_STATUS.Ongoing,
    pendingRequest.id
  );
  res.status(200).json({ request });
});

exports.rejectRequest = catchAsync(async (req, res, next) => {
  const pendingRequest =
    await requestService.findPendingRequestByPhotographerIdAndWorkId(
      req.user.id,
      req.workId
    );

  if (!pendingRequest) {
    createError("work request does not exist", 400);
  }

  const request = await requestService.updateRequestStatus(
    REQUEST_STATUS.Rejected,
    pendingRequest.id
  );
  res.status(200).json({ request });
});

exports.cancelRequest = catchAsync(async (req, res, next) => {
  const pendingRequest =
    await requestService.findPendingRequestByClientIdAndWorkId(
      req.user.id,
      req.workId
    );

  if (!pendingRequest) {
    createError("work request does not exist", 400);
  }

  const request = await requestService.updateRequestStatus(
    REQUEST_STATUS.Cancelled,
    pendingRequest.id
  );
  res.status(200).json({ request });
});

exports.completeRequest = catchAsync(async (req, res, next) => {
  const pendingRequest =
    await requestService.findOngoingRequestByClientIdAndWorkId(
      req.user.id,
      req.workId
    );

  if (!pendingRequest) {
    createError("work request does not exist", 400);
  }

  const request = await requestService.updateRequestStatus(
    REQUEST_STATUS.Completed,
    pendingRequest.id
  );
  res.status(200).json({ request });
});

exports.getRequestsByUserId = catchAsync(async (req, res, next) => {
  const paramsUser = await userService.findUserById(+req.params.userId);

  if (paramsUser.role === USER_ROLE.Photographer) {
    const requests = await requestService.findRequestsByPhotographerId(
      +req.params.userId
    );
    res.status(200).json({ requests });
  }

  if (paramsUser.role === USER_ROLE.Client) {
    const requests = await requestService.findRequestsByClientId(
      +req.params.userId
    );
    res.status(200).json({ requests });
  }
});

exports.getRequestByRequestId = catchAsync(async (req, res, next) => {
  const request = await requestService.findRequestByRequestId(
    +req.params.requestId
  );
  res.status(200).json({ request });
});
