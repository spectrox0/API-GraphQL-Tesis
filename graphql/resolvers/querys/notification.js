const Notification = require("../../../models/Notification.js");
const { message, post } = require("../merge");

const transformNotification = async notification => ({
  ...notification._doc,
  _id: notification.id,
  message: message.bind(this, notification._doc.message),
  post: post.bind(this, notification._doc.post)
});
module.exports = {
  notifications: async (_, { userId }) => {
    try {
      const notifications = await Notification.find({
        active: true,
        user: userId
      }).sort({
        _id: -1
      });
      return notifications.map(notification =>
        transformNotification(notification)
      );
    } catch (err) {
      throw err;
    }
  }
};
