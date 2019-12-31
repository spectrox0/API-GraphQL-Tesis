const Message = require("../../../models/Message.js");
const Post = require("../../../models/Post.js");
const { user, post } = require("../merge.js");
const { dateToString } = require("../date.js");

const transformMessage = message => {
  return {
    ...message._doc,
    date: dateToString(message._doc.date),
    post: post.bind(this, message._doc.post)
  };
};

module.exports = {
  createMessage: async (_, { messageInput }, { pubsub }) => {
    try {
      /* const post = await Post.findById(messageInput.postId);
      if (!post) throw new Error("post does not exist");  */
      const message = await new Message({
        content: messageInput.content,
        user: messageInput.userId,
        post: messageInput.postId
      });
      await message.populate("user").execPopulate();
      const result = await message.save();

      pubsub.publish("MESSAGE_ADDED", {
        messageAdded: transformMessage(result),
        post: result._doc.post
      });

      return transformMessage(result);
    } catch (err) {
      throw err;
    }
  }
};
