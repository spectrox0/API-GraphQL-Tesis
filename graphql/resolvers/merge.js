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

const post = async id => {
  console.log("holaaa");
  const res = await Post.findById(id);
  return {
    ...res._doc,
    _id: res.id,
    date: dateToString(res._doc.date)
  };
};

const message = async id => {
  console.log("holaaa");
  const message = await Message.findById(id);
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message._doc.user),
    date: dateToString(message._doc.date)
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
      date: dateToString(message._doc.date)
    };
  });
};

const lastMessage = async postId => {
  const res = await Message.find({ post: postId }).limit(1);
  if (res[0]) {
    return {
      ...res[0]._doc,
      _id: res[0].id,
      user: user.bind(this, res[0]._doc.user)
    };
  }
  return null;
};

exports.post = post;
exports.message = message;
exports.user = user;
exports.messages = messages;
exports.lastMessage = lastMessage;
