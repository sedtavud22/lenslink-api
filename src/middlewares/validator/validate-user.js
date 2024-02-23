const Joi = require("joi");
const { validate } = require("./validator");

const editProfileSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Please select your gender",
    "any.required": "Gender is required",
  }),
  role: Joi.string().required().messages({
    "string.empty": "Please select your role",
    "any.required": "Role is required",
  }),
  province: Joi.string().required().messages({
    "string.empty": "Please select your province",
    "any.required": "Province is required",
  }),
  profileInfo: Joi.string().trim(),
});

exports.validateEditProfile = validate(editProfileSchema);
