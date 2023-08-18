const { addNoticesToCategory } = require("./addNoticesToCategory");
const { getNoticesById } = require("./getNoticesById");
const { getNotices } = require("./getNotices");
const { getAllOwnNotices } = require("./getAllOwnNotices");
const { deleteOwnNoticeById } = require("./deleteOwnNoticeById");
const { addNoticeToFavorites } = require("./addNoticeToFavorites");
const { removeNoticeFromFavorites } = require("./removeNoticeFromFavorites");
const { getAllFavorites } = require("./getAllFavorites");

module.exports = {
  addNoticesToCategory,
  getNoticesById,
  getNotices,
  getAllOwnNotices,
  deleteOwnNoticeById,
  addNoticeToFavorites,
  removeNoticeFromFavorites,
  getAllFavorites,
};
