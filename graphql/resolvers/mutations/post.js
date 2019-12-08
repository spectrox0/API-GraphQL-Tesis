/* eslint-disable no-useless-catch */
const Post = require("../../../models/Post.js");
const User = require("../../../models/User.js");
const Message = require("../../../models/Message.js");
const { user } = require("../merge");

const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    creator: user.bind(this, post._doc.creator)
  };
};
module.exports = {
  createPost: async (_, { postInput, contentMessage }, context) => {
    if (!context.token) {
      throw new Error("No Authorized");
    }
    try {
      const creator = await User.findById(postInput.creator);
      if (!creator) {
        throw new Error("No creator");
      }
      const newPost = await new Post({
        title: postInput.title,
        creator: postInput.creator,
        urlImg: postInput.urlImg,
        category: postInput.category
      });
      newPost.users.push(postInput.creator);

      const result = await newPost.save();
      const newMessage = await new Message({
        content: contentMessage,
        user: postInput.creator,
        post: result.id
      });
      await newMessage.save();
      creator.posts.push(result.id);
      await creator.save();

      return transformPost(result);
    } catch (err) {
      throw err;
    }
  }
};
