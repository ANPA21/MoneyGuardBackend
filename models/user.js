const { userMongoSchema } = require("../schemas");
const { model } = require("mongoose");
const User = model("user", userMongoSchema);

module.exports = User;
