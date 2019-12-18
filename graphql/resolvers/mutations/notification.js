const Notification = require("../../../models/Notification.js");

const { message, post } = require("../merge");

const transformNotification = notification => ({
  ...notification._doc,
  _id: notification.id,

  message: message.bind(this, notification._doc.message)
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
  }
};
