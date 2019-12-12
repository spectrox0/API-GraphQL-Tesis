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
      const messages = Message.find({ post: postId, active: true })
        .sort({ _id: -1 })
        .limit(first)
        .after(after);
      if (messages) {
        return messages.map(message => transformMessage(message));
      }
    } catch (err) {
      throw err;
    }
  }
};
