// const { User } = require('../models/user');

// module.exports = {
//     // get user
//     getUser: body => User.findOne(body),
//     // get user by id
//     getUserById: userId => User.findById(userId),
//     // update user
//     updateUser: (userId, body) =>
//         User.findByIdAndUpdate(userId, body, { new: true }),
//     // signup user
//     register: ({ password, ...body }) => {
//         const newUser = new User(body);
//         newUser.hashPassword(password);
//         return newUser.save();
//     },
// };