const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    sender: { type: String },
    content: { type: String, trim: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
