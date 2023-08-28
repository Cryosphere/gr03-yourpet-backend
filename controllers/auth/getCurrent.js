const getCurrent = async (req, res) => {
  const { _id, name, email, phone, birthday, city, image, favorite } = req.user;
  res.status(200).json({
    _id,
    email,
    name,
    phone,
    birthday,
    city,
    image,
    favorite,
  });
};

module.exports = getCurrent;
