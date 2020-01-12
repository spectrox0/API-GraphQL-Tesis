/* eslint-disable node/no-unsupported-features/es-syntax */
const Post = require("../../../models/Post.js");
const { user, messages, lastMessage } = require("../merge");

const { dateToString } = require("../date.js");

const transformPost = post => {
  return {
    ...post._doc,
    creator: user.bind(this, post._doc.creator),
    date: dateToString(post._doc.date),
    messages: messages(post.id),
    lastMessage: lastMessage(post.id)
  };
};
module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find({ active: true });
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
  },
  postsByCreator: async (_, { userId }) => {
    try {
      const posts = await Post.find({ creator: userId, active: true });
      return posts.map(post => transformPost(post));
    } catch (err) {
      throw err;
    }
  }
};
