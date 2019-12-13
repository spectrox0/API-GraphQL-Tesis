const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: "Message"
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("Notifications", messageSchema);
