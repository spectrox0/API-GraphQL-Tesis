const Notification = require("../../../models/Notification.js");
const { message, post } = require("../merge");
const { dateToString } = require("../date.js");

const transformNotification = async (notification, message) => ({
  ...notification._doc,
  message: {
    ...message._doc,
    date: dateToString(message._doc.date)
  }
});
module.exports = {
  notifications: async (_, { userId }) => {
    try {
      const notifications = await Notification.find({
        user: userId
      })
        .populate({
          path: "message",
          populate: {
            path: "user"
          }
        })
        .populate("post");
      return notifications.map(notification =>
        transformNotification(notification, notification.message)
      );
    } catch (err) {
      throw err;
    }
  }
};
