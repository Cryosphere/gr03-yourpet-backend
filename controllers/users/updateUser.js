const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const { cloudinaryAddImage } = require("../../middlewares");

const updateUser = async (req, res) => {
  const { _id } = req.user;

  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id.toString() !== _id) {
    return res.status(400).json({ error: "Email already exists" });
  }

  let updatedFields = { ...req.body };
  if (req.file) {
    const imageURL = await cloudinaryAddImage(req.file.path);
    updatedFields.image = imageURL.secure_url;
  }

  const user = await User.findByIdAndUpdate(_id, updatedFields, {
    new: true,
  }).select("-accessToken -refreshToken -createdAt -password -updatedAt");

  res.status(200).json({
    user: {
      image: user.image,
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
