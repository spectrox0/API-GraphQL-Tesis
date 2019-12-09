const { withFilter } = require("apollo-server");

module.exports = {
  messageAdded: {
    subscribe: (root, { postId }, { pubsub }) =>
      pubsub.asyncIterator([`MESSAGE_ADDED_${postId}`])
  }
};
