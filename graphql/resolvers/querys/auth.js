const User = require("../../../models/User.js");
const Post = require("../../../models/Post.js");

const { dateToString } = require("../date.js");

const transformPosts = async id => {
  const posts = await Post.find({ creator: id });
  return posts.map(post => {
    return {
      ...post._doc,
      _id: post.id,
      date: dateToString(post.date)
    };
  });
};

const transformUser = user => {
  return {
    ...user._doc,
    password: null,
    _id: user.id,
    posts: transformPosts(user.id)
  };
};
module.exports = {
  currentUser: async (_, args, context) => {
    try {
      if (!context.userId) {
        return null;
      }
      const user = await User.findById(context.userId);
      return transformUser(user);
    } catch (err) {
      throw err;
    }
  }
};
