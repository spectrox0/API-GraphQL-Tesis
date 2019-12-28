const { withFilter } = require("apollo-server");

module.exports = {
  messageAdded: {
    subscribe: withFilter(
      (_, args, { pubsub }) => pubsub.asyncIterator("MESSAGE_ADDED"),
      ({ post }, { postId }) => {
        // eslint-disable-next-line eqeqeq
        return post == postId;
      }
    )
  }
};
