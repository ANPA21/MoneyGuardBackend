const Contact = require("../../models/contact");
const { requestError } = require("../../helpers");

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw requestError(404);
  }
  res.status(200).json(result);
};

module.exports = updateFavoriteById;
