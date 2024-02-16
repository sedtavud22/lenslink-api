const Joi = require("joi");
const { validate } = require("./validator");

const requestSchema = Joi.object({
  description: Joi.string(),
  date: Joi.date()
    .required()
    .messages({
      "date.base": "Invalid date",
      "any.required": "Date is required",
    }),
  clientMobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number",
      "string.empty": "Client mobile number is required",
      "any.required": "Client mobile number is required",
    }),
  clientSocialMedia: Joi.string(),
});

exports.validateRequest = validate(requestSchema);
