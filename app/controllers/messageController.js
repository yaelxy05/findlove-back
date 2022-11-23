// ----------
// Model
// ----------
const mongoose = require("mongoose");
const Message = mongoose.model("Message");
const Chat = mongoose.model("Chat");

exports.createMessage = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);

  const sender = req.params.senderId;

  const newMessage = await new Message({
    sender: sender,
    conversationId: chat._id,
    text: req.body.text,
  });

  try {
    newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessageByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
