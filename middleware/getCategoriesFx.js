const fs = require('fs/promises');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '..', 'categoriesList.json');

const getCategories = async () => {
  try {
    const data = await fs.readFile(categoriesFilePath, 'utf8');
    const categories = JSON.parse(data);
    return categories;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCategories;
