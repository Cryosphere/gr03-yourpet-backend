const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const addNoticeToFavorites = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      throw HttpError(404, `User with id "${_id}" not found`);
    }

    if (user.favorite.includes(id)) {
      throw HttpError(
        409,
        `Notice with id "${id}" is already in your favorites`
      );
    }

    await User.findOneAndUpdate(
      { _id },
      { $push: { favorite: id } },
      { new: true }
    );

    res.status(200).json({
      id: `${id}`,
      message: "Successfully added to favorites",
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = { addNoticeToFavorites: ctrlWrapper(addNoticeToFavorites) };
