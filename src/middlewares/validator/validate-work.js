const Joi = require("joi");
const { validate, workIdValidator } = require("./validator");

const workSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  firstAvailableDate: Joi.date().greater("now").required().messages({
    "date.base": "First available date is an invalid date",
    "date.greater": "First available date must be tomorrow or later",
    "any.required": "First available date is required",
  }),
  lastAvailableDate: Joi.date()
    .greater(Joi.ref("firstAvailableDate"))
    .required()
    .messages({
      "date.base": "Last available date is invalid",
      "date.greater":
        "Last available date must be later than first available date",
      "any.required": "Last available date is required",
    }),
  cardImage: Joi.string(),
  deletedOldSubImagesId: Joi.any(),
});

const workIdSchema = Joi.object({
  workId: Joi.number().positive().required(),
});

exports.validateCreateWork = validate(workSchema);

exports.validateWorkId = workIdValidator(workIdSchema);
