const express = require("express");
const { users: controllers } = require("../../controllers");
const { validateBody } = require("../../utils");

const router = express.Router();

const { schemas, userSchemas } = require("../../models");

const { isValidId, authenticate, upload } = require("../../middlewares");

router.post(
  "/pets",
  authenticate,
  upload.single("image"),
  validateBody(schemas.addMyPetSchema),
  controllers.addMyPet
);

router.delete(
  "/pets/:id",
  authenticate,
  isValidId,
  controllers.removeMyPetById
);

router.get("/", authenticate, controllers.getAllInfo);

router.patch(
  "/",
  authenticate,
  upload.single("image"),
  validateBody(userSchemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
