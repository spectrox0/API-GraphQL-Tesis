module.exports = {
  messageAdded: {
    subscribe: (root, { postId }, { pubsub }) => {
      return pubsub.asyncIterator([`MESSAGE_ADDED_${postId}`]);
    }
  }
};
