const { ctrlWrapper } = require("../../utils");
const { MyPet } = require("../../models");

const getAllInfo = async (req, res, next) => {
  const {
    _id: owner,
    name,
    email,
    phone,
    birthday,
    city,
    image,
    favorite,
  } = req.user;
  const pets = await MyPet.find({ owner }, "-createdAt -updatedAt -owner");
  res.status(200).json({
    pets,
    user: {
      id: owner,
      name,
      email,
      phone,
      birthday,
      city,
      image,
      favorite,
    },
  });
};

module.exports = { getAllInfo: ctrlWrapper(getAllInfo) };
