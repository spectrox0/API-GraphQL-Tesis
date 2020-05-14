const Message = require("../../../models/Message.js");
const { user, post } = require("../merge");
const { dateToString } = require("../date.js");

const transformMessage = (message) => ({
  ...message._doc,
  date: dateToString(message._doc.date),
  post: post.bind(this, message._doc.post),
});
module.exports = {
  messages: async (_, { first, after, postId }) => {
    try {
      let messages;
      if (!after) {
        messages = await Message.find({ post: postId, active: true })
          .sort({ _id: -1 })
          .limit(first)
          .populate("user");
      } else {
        messages = await Message.find({
          post: postId,
          active: true,
          _id: { $lt: after },
        })
          .sort({ _id: -1 })
          .limit(first)
          .populate("user");
      }
      const hasNextPage = await Message.findOne({
        _id: { $lt: messages[messages.length - 1].id },
        post: postId,
        active: true,
      });
      return {
        messages: messages.map((message) => transformMessage(message)),
        hasNextPage: !!hasNextPage,
      };
    } catch (err) {
      throw err;
    }
  },
};
