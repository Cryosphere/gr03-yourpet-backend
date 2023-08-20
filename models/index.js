const { User, userSchemas } = require("./user");
const { News } = require("./news");
const { Notices, schemasNotices } = require("./notices");
const { Sponsors } = require("./sponsors");
const { MyPet, petValidationSchema } = require("./pets");

module.exports = {
  User,
  userSchemas,
  News,
  Notices,
  schemasNotices,
  Sponsors,
  MyPet,
  petValidationSchema,
};
