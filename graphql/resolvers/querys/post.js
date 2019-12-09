/* eslint-disable node/no-unsupported-features/es-syntax */
const Post = require("../../../models/Post.js");
const Message = require("../../../models/Message.js");
const { user } = require("../merge");

const { dateToString } = require("../date.js");

const messages = async postId => {
  const res = await Message.find({ post: postId }).limit(100);
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
const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    creator: user.bind(this, post._doc.creator),
    date: dateToString(post._doc.date),
    messages: messages(post.id),
    lastMessage: lastMessage(post.id)
  };
};
module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find({ active: true }).limit(100);
      if (posts) {
        return posts.map(post => transformPost(post));
      }
      throw new Error("Not found");
    } catch (err) {
      throw err;
    }
  },
  post: async (_, { _id }) => {
    try {
      const post = await Post.findById(_id);
      if (!post) throw new Error("not found post");

      return transformPost(post);
    } catch (err) {
      throw err;
    }
  },
  searchPost: async (_, { first, after, categories, word }) => {
    try {
      let posts;
      if (categories.length > 0) {
        posts = await Post.find({
          category: {
            $in: categories
          },
          title: {
            $regex: `^${word}`,
            $options: "i"
          }
        })
          .skip(after)
          .limit(first);
      } else {
        posts = await Post.find({
          title: {
            $regex: `^${word}`,
            $options: "i"
          }
        })
          .skip(after)
          .limit(first);
      }
      return posts.map(post => transformPost(post));
    } catch (err) {
      throw err;
    }
  }
};
