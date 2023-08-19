const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const { cloudinaryAddImage } = require("../../middlewares");

const updateUser = async (req, res) => {
  const { _id } = req.user;

  let updatedFields = { ...req.body };
  if (req.body.file) {
    const imageURL = await cloudinaryAddImage(req.body.file);
    updatedFields.imageURL = imageURL.secure_url;
  }

  const user = await User.findByIdAndUpdate(_id, updatedFields, {
    new: true,
  }).select("-accessToken -refreshToken -createdAt -password -updatedAt");

  res.status(200).json({
    user: {
      imageURL: user.imageURL,
      userInfo: {
        name: user.name,
        email: user.email,
        city: user.city,
        phone: user.phone,
        birthday: user.birthday,
      },
    },
  });
};
module.exports = { updateUser: ctrlWrapper(updateUser) };
