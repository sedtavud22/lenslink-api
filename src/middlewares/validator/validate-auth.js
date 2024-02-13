const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email address is required",
    "string.email": "Invalid email",
    "any.required": "Email address is required",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be at least 6 characters and contain only alphabet and number",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "Confirm password is required",
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    })
    .strip(),
  gender: Joi.string().required().messages({
    "string.empty": "Gender is required",
    "any.required": "Gender is required",
  }),
  role: Joi.string().required().messages({
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),
  province: Joi.string().required().messages({
    "string.empty": "Province is required",
    "any.required": "Province is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().trim().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
