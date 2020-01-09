const User = require("../../models/User.js");
const Post = require("../../models/Post.js");
const Message = require("../../models/Message.js");
const { dateToString } = require("./date.js");

const user = async id => {
  const user = await User.findById(id);
  return {
    ...user._doc,
    _id: user.id
  };
};

const message = async id => {
  const message = await Message.findById(id);
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message._doc.user),
    date: dateToString(message._doc.date),
    post: post.bind(this, message._doc.post)
  };
};

const messages = async postId => {
  const res = await Message.find({ post: postId })
    .limit(100)
    .sort({ _id: -1 });
  return res.map(message => {
    return {
      ...message._doc,
      _id: message.id,
      user: user.bind(this, message._doc.user),
      date: dateToString(message._doc.date),
      post: post.bind(this, message._doc.post)
    };
  });
};

const lastMessage = async postId => {
  const res = await Message.findOne({ post: postId }).sort({ _id: -1 });
  if (res) {
    return {
      ...res._doc,
      _id: res.id,
      user: user.bind(this, res._doc.user),
      date: dateToString(res._doc.date)
    };
  }
  return null;
};

const post = async id => {
  const res = await Post.findById(id);
  return {
    ...res._doc,
    _id: res.id,
    date: dateToString(res._doc.date),
    creator: user.bind(this, res._doc.creator),
    messages: messages(id)
  };
};
exports.post = post;
exports.message = message;
exports.user = user;
exports.messages = messages;
exports.lastMessage = lastMessage;
