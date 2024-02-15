const { isWithinInterval, isEqual } = require("date-fns");

exports.validateDateRange = (date, start, end) =>
  isWithinInterval(date, { start, end });

exports.validateEqualDate = (date1, date2) => isEqual(date1, date2);
