const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const imageURL = gravatar.url(email, { protocol: "http", s: "250" });

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    imageURL,
  });
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
    },
  });
};

module.exports = register;
