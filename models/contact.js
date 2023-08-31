const { contactMongoSchema } = require("../schemas");
const { model } = require("mongoose");
const Contact = model("contact", contactMongoSchema);

module.exports = Contact;
