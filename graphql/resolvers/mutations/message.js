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
  createMessage: async (_, { messageInput }, { pubsub, userId }) => {
    try {
      if (userId !== messageInput.userId) {
        return new Error("No authorized");
      }
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
