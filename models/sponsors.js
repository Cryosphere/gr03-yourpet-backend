const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const sponsorsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for new"],
    },
    url: {
      type: String,
    },
    addressUrl: { type: String },
    imageUrl: {
      type: String,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    workDays: {
      type: Array,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: { type: String },
  },
  {
    versionKey: false,
  }
);

sponsorsSchema.post("save", handleMongooseError);

const Sponsors = model("sponsors", sponsorsSchema);
module.exports = { Sponsors };
