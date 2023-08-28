const { ctrlWrapper } = require("../../utils");
const { MyPet } = require("../../models");
const { cloudinaryAddImage } = require("../../middlewares");

const addMyPet = async (req, res, next) => {
  const { _id: owner } = req.user;
  let imageURL;
  if (req.file) {
    const photo = await cloudinaryAddImage(req.file.path);
    imageURL = photo.secure_url;
  } else {
    imageURL = "";
  }
  const result = await MyPet.create({ ...req.body, imageURL, owner });
  res.status(201).json(result);
};

module.exports = { addMyPet: ctrlWrapper(addMyPet) };
