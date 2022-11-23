// ----------
// Model
// ----------
const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");

exports.createChat = async (req, res, next) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const saveConversation = await newChat.save();
    res.status(201).json(saveConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getChatByUserId = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};
