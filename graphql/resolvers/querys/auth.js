const User = require("../../../models/User.js");
const Post = require("../../../models/Post.js");
const Notification = require("../../../models/Notification.js");

const { dateToString } = require("../date.js");
const { user, messages, lastMessage, message } = require("../merge");

const transformPosts = async id => {
  const posts = await Post.find({ creator: id });
  return posts.map(post => {
    return {
      ...post._doc,
      _id: post.id,
      date: dateToString(post._doc.date),
      messages: messages(post.id),
      lastMessage: lastMessage(post.id)
    };
  });
};
const transformNotifications = async id => {
  const notifications = await Notification.find({ user: id });
  return notifications.map(notification => ({
    ...notifications._doc,
    _id: notification.id,
    message: message.bind(this, notification._doc.message),
    user: user.bind(this, notification._doc.user)
  }));
};
const transformUser = user => {
  return {
    ...user._doc,
    password: null,
    _id: user.id,
    posts: transformPosts(user.id),
    notifications: transformNotifications(user.id)
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
