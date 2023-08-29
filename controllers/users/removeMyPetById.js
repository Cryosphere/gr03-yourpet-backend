const { ctrlWrapper } = require("../../utils");
const { MyPet } = require("../../models");
const { HttpError } = require("../../helpers");

const removeMyPetById = async (req, res, next) => {
 try {
    const { id: petId } = req.params;
  const { _id: userId } = req.user;
 const result = await MyPet.findOneAndDelete({ id: petId, owner: userId });
  res.status(200).json({ message: "pet has been deleted", id });
   return result;
    } catch (error) {
      console.log(error);
      throw HttpError(404, "Not found");
 }
};

module.exports = { removeMyPetById: ctrlWrapper(removeMyPetById) };
