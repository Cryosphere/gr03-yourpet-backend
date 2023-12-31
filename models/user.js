const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");

const nameRegexp = /^[a-zA-Z\s]*$/;
const emailRegexp =
  /^(?=.{10,63}$)(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
const passRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([0-9a-zA-Z]{6,})*$/;
const phoneRegexp = /^\+38(0\d{9})$/;
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const cityRegexp = /^([A-Za-z]+)*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      default: "",
    },
    birthday: {
      type: String,
      match: dateRegExp,
      default: "",
    },
    city: {
      type: String,
      default: "",
      match: cityRegexp,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzbevpbos/image/upload/v1684831673/Photo_default_pzeg2t.png",
    },
    favorite: {
      type: Array,
      default: [],
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(2).pattern(nameRegexp).required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be an empty field`,
    "string.base": `"name" must be string`,
    "string.min": `"name" should have a minimum length of 2`,
  }),
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be an empty field`,
  }),
  password: Joi.string()
    .pattern(passRegexp)
    .min(6)
    .max(32)
    .required()
    .messages({
      "any.required": `"password" is required`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of 6`,
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be an empty field`,
  }),
  password: Joi.string()
    .pattern(passRegexp)
    .min(6)
    .max(32)
    .required()
    .messages({
      "any.required": `"password" is required`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of 6`,
    }),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(1).pattern(nameRegexp).optional(),
  email: Joi.string().pattern(emailRegexp).min(10).max(63).optional(),
  birthday: Joi.string().pattern(dateRegExp).optional(),
  phone: Joi.string().pattern(phoneRegexp).optional(),
  city: Joi.string().pattern(cityRegexp).optional(),
  image: Joi.string().optional(),
});

const userSchemas = {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateUserSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas,
};
