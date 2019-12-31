const Notification = require("../../../models/Notification.js");

const { post, user } = require("../merge");

const transformNotification = notification => ({
  ...notification._doc,
  _id: notification.id,
  post: post.bind(this, notification._doc.post),
  user: user.bind(this, notification._doc.user)
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
      });
      return notifications.map(notification =>
        transformNotification(notification)
      );
    } catch (err) {
      throw err;
    }
  },
  createNotification: async (_, { notificationInput }, { pubsub }) => {
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
