const { cloudinary } = require("../utils");
const fs = require("fs/promises");
const Jimp = require("jimp");
const path = require("path");

const cloudinaryAddImage = async (file) => {
  try {
    console.log(path);
    const tempDir = path.join(__dirname, "../", "tmp", file);
    console.log(tempDir);
    const resizeImg = await Jimp.read(tempDir);
    resizeImg.cover(450, 450);
    await resizeImg.writeAsync(tempDir);
    const result = await cloudinary.uploader.upload(tempDir);
    fs.unlink(tempDir);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = cloudinaryAddImage;
