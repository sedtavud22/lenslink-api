const requestService = require("../services/request-service");
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

exports.acceptRequest = catchAsync(async (req, res, next) => {});

exports.rejectRequest = catchAsync(async (req, res, next) => {});

exports.cancelRequest = catchAsync(async (req, res, next) => {});

exports.completeRequest = catchAsync(async (req, res, next) => {});
