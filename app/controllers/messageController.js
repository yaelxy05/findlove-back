// ----------
// Model
// ----------
const mongoose = require("mongoose");
const Message = mongoose.model("Message");
const Chat = mongoose.model("Chat");
const User = mongoose.model("User");

exports.createMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { receiverId } = req.params;
 

  const newMessage = await new Message({
    receiverId:receiverId,
    conversationId: conversationId,
    content: req.body.content,
    //sender: sender
  });

  try {
    newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessageByConversationId = async (req, res) => {
  const conversationId = req.params.conversationId;
  
  try {
    const messages = await Message.find({
      conversationId: conversationId,
    })
      .populate("conversationId")

    console.log(messages);

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
