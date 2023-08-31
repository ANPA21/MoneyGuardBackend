const Contact = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const favorite = req.query.favorite;
  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite;
  }
  const result = await Contact.find(filter, "-createdAt -updatedAt").populate("owner", "name email");
  res.json(result);
};

module.exports = getAllContacts;
