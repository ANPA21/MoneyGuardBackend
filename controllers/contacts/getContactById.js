const Contact = require("../../models/contact");
const { requestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw requestError(404);
  }
  res.json(result);
};

module.exports = getContactById;
