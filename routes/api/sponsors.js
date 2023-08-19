const express = require("express");
const router = express.Router();

const { sponsors } = require("../../controllers");

router.get("/", sponsors.getSponsors);

module.exports = router;
