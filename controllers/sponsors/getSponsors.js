const { ctrlWrapper } = require("../../utils");
const { Sponsors } = require("../../models");

const getSponsors = async (req, res) => {
  const sponsors = await Sponsors.find();
  res.json(sponsors);
};

module.exports = {
  getSponsors: ctrlWrapper(getSponsors),
};
