const Message = require("../../../models/Message.js");
const User = require("../../../models/User.js");
const Post = require("../../../models/Post.js");
const { user, post } = require("../merge.js");
const { dateToString } = require("../date.js");

const transformMessage = message => {
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message._doc.user),
    post: post.bind(this, message._doc.post),
    date: dateToString(message._doc.date)
  };
};
module.exports = {
  createMessage: async (_, { messageInput }, { pubsub }) => {
    try {
      const user = await User.findById(messageInput.userId);
      if (!user) throw new Error("No user");
      const post = await Post.findById(messageInput.postId);
      if (!post) throw new Error("No post");
      const message = await new Message({
        content: messageInput.content,
        user: messageInput.userId,
        post: messageInput.postId
      });
      const result = await message.save();
      pubsub.publish(`MESSAGE_ADDED_${result._doc.post}`, {
        messageAdded: transformMessage(result)
      });
      return transformMessage(result);
    } catch (err) {
      throw err;
    }
  }
};
