const { withFilter } = require("apollo-server");
const { pubsub } = require("../../resolvers/pubsub.js");

module.exports = {
  messageAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("MESSAGE_ADDED"),
      ({ post }, { postId }) => {
        // eslint-disable-next-line eqeqeq
        return post == postId;
      }
    )
  }
};
