const { ctrlWrapper } = require("../../utils");
const { MyPet } = require("../../models");
const { cloudinaryAddImage } = require("../../middlewares");

const addMyPet = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    let image;
    console.log(req.file.path);
    if (req.file) {
      const photo = await cloudinaryAddImage(req.file.path);
      image = photo.secure_url;
    } else {
      image = "";
    }
    console.log(image);
    const result = await MyPet.create({ ...req.body, image, owner });
    res.status(201).json(result);
  } catch (error) {
    console.error("Update petAvatar error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addMyPet: ctrlWrapper(addMyPet) };
