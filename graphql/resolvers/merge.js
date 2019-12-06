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
  const res = await Post.findById(id);
  return {
    ...res._doc,
    _id: res.id,
    date: dateToString(res._doc.date)
  };
};

const message = async id => {
  const message = await Message.findById(id);
  return {
    ...message._doc,
    _id: message.id
  };
};

exports.post = post;
exports.message = message;
exports.user = user;
