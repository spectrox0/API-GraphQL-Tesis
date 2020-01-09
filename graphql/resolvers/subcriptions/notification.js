const { withFilter } = require("apollo-server");
const { pubsub } = require("../../resolvers/pubsub.js");

module.exports = {
  notificationAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("NOTIFICATION_ADDED"),
      ({ user }, { userId }) => {
        // eslint-disable-next-line eqeqeq
        return user == userId;
      }
    )
  }
};
