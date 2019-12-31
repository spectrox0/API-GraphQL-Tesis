module.exports = {
  updateLastMessage: {
    subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("MESSAGE_ADDED")
  }
};
