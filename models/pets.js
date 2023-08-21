const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const nameRegexp = /^[a-zA-Z\s]*$/;
const birthdayRegexp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const breedRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const urlRegexp = /^(https?:\/\/)?([\w.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;

const petSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name please"],
    match: nameRegexp,
    minLength: 2,
    maxLength: 16,
  },
  birthday: {
    type: String,
    match: birthdayRegexp,
    required: true,
  },
  breed: {
    type: String,
    required: [true, "Set breed please"],
    match: breedRegexp,
    minLength: 2,
    maxLength: 16,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comments: String,
  imageURL: {
    type: String,
    match: urlRegexp,
  },
});

petSchema.post("save", handleMongooseError);

const petValidationSchema = Joi.object({
  // name: Joi.string().required(),
  // birthday: Joi.string().required(),
  // breed: Joi.string().required(),
  name: Joi.string().pattern(nameRegexp).min(2).max(16).required().messages({
    "any.required": `missing required "name"`,
    "string.empty": `"name" cannot be empty`,
  }),
  birthday: Joi.string().pattern(birthdayRegexp).required(),
  breed: Joi.string().pattern(breedRegexp).min(2).max(16).required().messages({
    "any.required": `missing required "breed"`,
    "string.empty": `"breed" cannot be empty`,
  }),
  comments: Joi.string(),
  imageURL: Joi.string().pattern(urlRegexp).uri(),
});

const MyPet = model("pets", petSchema);
module.exports = { MyPet, petValidationSchema };
