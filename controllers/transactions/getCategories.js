const fs = require("fs/promises");
const path = require("path");

const categoriesFilePath = path.join(__dirname, "..", "..", "categoriesList.json");

const getCategories = async (req, res, next) => {
  try {
    const data = await fs.readFile(categoriesFilePath, "utf8");
    const categories = JSON.parse(data);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories
};