const Contact = require("../../models/contact");
const { requestError } = require("../../helpers");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw requestError(404);
  }
  res.status(204).json();
};

module.exports = removeContactById;
