module.exports = {
  postAddedUser: {
    subscribe: (root, { userId }, { pubsub }) =>
      pubsub.asyncIterator([`POST_ADDED_${userId}`])
  }
};
