module.exports = {
  notificationAdded: {
    subscribe: (root, { userId }, { pubsub }) =>
      pubsub.asyncIterator([`NOTIFICATION_ADDED_${userId}`])
  }
};
