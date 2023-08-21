const express = require("express");
const { ctrlWrapper } = require("../../utils");
const { users } = require("../../controllers");
const { validateBody } = require("../../utils");

const router = express.Router();

const { userSchemas, petValidationSchema } = require("../../models");
const { authenticate, upload, isValidId } = require("../../middlewares");

router.get("/", authenticate, ctrlWrapper(users.getAllInfo));
router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateUserSchema),
  ctrlWrapper(users.updateUser)
);
router.post(
  "/pets",
  authenticate,
  validateBody(petValidationSchema),
  upload.single("imageUrl"),
  ctrlWrapper(users.addMyPet)
);
router.delete(
  "/pets/:id",
  authenticate,
  isValidId,
  ctrlWrapper(users.removeMyPetById)
);

module.exports = router;
