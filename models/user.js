const { model } = require("mongoose");
const { userMongoSchema } = require("../schemas/userSchemas");
const User = model("user", userMongoSchema);

module.exports = User;
