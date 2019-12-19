const Message = require("../../../models/Message.js");
const User = require("../../../models/User.js");
const Post = require("../../../models/Post.js");
const Notification = require("../../../models/Notification.js");
const { user, post } = require("../merge.js");
const { dateToString } = require("../date.js");

const transformMessage = message => {
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message._doc.user),
    date: dateToString(message._doc.date)
  };
};
const transformNotification = (notification, message) => ({
  ...notification._doc,
  _id: notification.id,
  message: transformMessage(message),
  post: post.bind(this, notification._doc.post)
});
module.exports = {
  createMessage: async (_, { messageInput }, { pubsub, userId }) => {
    try {
      if (userId !== messageInput.userId) {
        return new Error("No authorized");
      }
      const post = await Post.findById(messageInput.postId);
      if (!post) throw new Error("post does not exist");
      const message = await new Message({
        content: messageInput.content,
        user: messageInput.userId,
        post: messageInput.postId
      });
      const result = await message.save();

      pubsub.publish(`MESSAGE_ADDED_${result._doc.post}`, {
        messageAdded: transformMessage(result)
      });
      if (messageInput.userId != post._doc.creator) {
        const notification = await new Notification({
          post: messageInput.postId,
          message: result.id,
          user: post._doc.creator
        });
        console.log(messageInput.userId);
        console.log(post._doc.creator);
        const resNotification = await notification.save();
        pubsub.publish(`NOTIFICATION_ADDED_${post._doc.creator}`, {
          notificationAdded: transformNotification(resNotification, result)
        });
      }

      return transformMessage(result);
    } catch (err) {
      throw err;
    }
  }
};
