const Message = require("../../../models/Message.js");
const { user } = require("../merge");
const { dateToString } = require("../date.js");

const transformMessage = message => ({
  ...message._doc,
  _id: message.id,
  user: user.bind(this, message._doc.user),
  date: dateToString(message._doc.date)
});
module.exports = {
  messages: async (_, { first, after, postId }) => {
    try {
      let messages;
      if (!after) {
        messages = await Message.find({ post: postId, active: true })
          .sort({ _id: -1 })
          .limit(first);
      } else {
        messages = await Message.find({
          post: postId,
          active: true,
          _id: { $lt: after }
        })
          .sort({ _id: -1 })
          .limit(first);
      }
      const hasNextPage = await Message.findOne({
        _id: { $lt: messages[messages.length - 1].id },
        post: postId,
        active: true
      });
      return {
        messages: messages.map(message => transformMessage(message)),
        hasNextPage: !!hasNextPage
      };
    } catch (err) {
      throw err;
    }
  }
};
