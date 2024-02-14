const Joi = require("joi");
const { validate } = require("./validator");

const workSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  firstAvailableDate: Joi.date().greater("now").required().messages({
    "date.base": "First available date is an invalid date",
    "date.greater": "First available date must be tomorrow or later",
  }),
  lastAvailableDate: Joi.date()
    .greater(Joi.ref("firstAvailableDate"))
    .required()
    .messages({
      "date.base": "Last available date is invalid",
      "date.greater": "Last available date must be tomorrow or later",
    }),
});

exports.validateCreateWork = validate(workSchema);
