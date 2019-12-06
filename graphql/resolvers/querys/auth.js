const User = require("../../../models/User.js");
const { post } = require("../merge");

const transformPosts = posts => {
  return posts.map(element => post(element));
};
const transformUser = user => {
  return {
    ...user._doc,
    password: null,
    _id: user.id,
    posts: transformPosts.bind(this, user._doc.posts)
  };
};
module.exports = {
  currentUser: async (_, args, context) => {
    if (!context.userId) {
      return null;
    }
    const user = await User.findById(context.userId);
    return transformUser(user);
  }
};
