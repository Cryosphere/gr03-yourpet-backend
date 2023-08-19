const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");

const app = require("./app");

const { DB_HOST, PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);

const tempDir = path.join(process.cwd(), "tmp");
const avatarsDir = path.join(process.cwd(), "public", "avatars");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

mongoose
  .connect(DB_HOST)
  .then(console.log("Database connection successful"))
  .then(() =>
    app.listen(PORT, async () => {
      createFolderIsNotExist(tempDir);
      createFolderIsNotExist(avatarsDir);
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
