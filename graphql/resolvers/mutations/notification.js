const Notification = require("../../../models/Notification.js");

const { post, user } = require("../merge");
const { dateToString } = require("../date.js");
const { pubsub } = require("../../resolvers/pubsub.js");

const transformNotification = notification => ({
  ...notification._doc,
  post: post.bind(this, notification._doc.post),
  user: user.bind(this, notification._doc.user),
  message: {
    ...notification.message._doc,
    date: dateToString(notification.message._doc.date)
  }
});

module.exports = {
  deleteNotifications: async (_, { postId, userId }) => {
    try {
      const res = await Notification.deleteMany({
        post: postId,
        user: userId
      });
      if (!res) throw new Error("error");
      const notifications = await Notification.find({
        user: userId
      }).populate({
        path: "message",
        populate: {
          path: "user"
        }
      });
      return notifications.map(notification =>
        transformNotification(notification)
      );
    } catch (err) {
      throw err;
    }
  },
  createNotification: async (_, { notificationInput }) => {
    try {
      const notification = await new Notification({
        post: notificationInput.postId,
        message: notificationInput.messageId,
        user: notificationInput.userId
      });
      await notification
        .populate({
          path: "message",
          populate: {
            path: "user"
          }
        })
        .execPopulate();
      await notification.populate("post").execPopulate();
      const resNotification = await notification.save();
      pubsub.publish("NOTIFICATION_ADDED", {
        notificationAdded: transformNotification(resNotification),
        user: resNotification._doc.user
      });
      return transformNotification(resNotification);
    } catch (err) {
      throw err;
    }
  }
};
