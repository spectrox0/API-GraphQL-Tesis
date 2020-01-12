const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: "Message"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
