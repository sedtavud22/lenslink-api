const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1000 * 60 * 5,
  limit: 100,
  message: { message: "Too many requests" },
});
