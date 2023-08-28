const { ctrlWrapper } = require("../../utils");
const { MyPet } = require("../../models");
const { HttpError } = require("../../helpers");

const removeMyPetById = async (req, res, next) => {
  const { id: petId } = req.params;
  const { _id: userId } = req.user;

  removePet = async (petId, userId) => {
    try {
      return await Pet.findOneAndDelete({ id: petId, owner: userId });
    } catch (error) {
      console.log(error);
    }
  };

  const result = await MyPet.findByIdAndDelete(petId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "pet has been deleted", id });
};

module.exports = { removeMyPetById: ctrlWrapper(removeMyPetById) };
