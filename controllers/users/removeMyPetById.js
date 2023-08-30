const { ctrlWrapper } = require("../../utils");
const { MyPet } = require("../../models");
const { HttpError } = require("../../helpers");

const removeMyPetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const result = await MyPet.findOneAndDelete({ _id: id, owner: _id });

    if (!result) {
      throw HttpError(404, "Pet not found");
    }

    res.status(200).json({ message: "Pet has been deleted", id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { removeMyPetById: ctrlWrapper(removeMyPetById) };
