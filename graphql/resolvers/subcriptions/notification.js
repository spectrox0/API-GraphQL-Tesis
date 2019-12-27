const { withFilter } = require("apollo-server");

module.exports = {
  notificationAdded: {
    subscribe: withFilter(
      (_, args, { pubsub }) => pubsub.asyncIterator("NOTIFICATION_ADDED"),
      ({ notificationAdded: { user } }, { userId }) => {
        // eslint-disable-next-line eqeqeq
        return user == userId;
      }
    )
  }
};
