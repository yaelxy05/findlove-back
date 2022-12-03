// ----------
// Model
// ----------

const Chat = require("../models/Chat");

module.exports.createChat = async (req, res, next) => {
  const userId = req.params.receiverId;
  const senderId = req.user.id;
  const isChat = await Chat.find({
    isExistAlready: true,
    senderId: senderId,
    receiverId: userId,
  })
    .populate("receiverId", "-hash -salt")
    .populate("senderId", "-hash -salt")
    .populate("latestMessage");


  if (isChat.length > 0) {
    console.log("la conversation existe déja!")
    res.status(200).json({message: "la conversation existe déja"});
  } else {
    const newChat = new Chat({
    senderId: senderId,
    receiverId: req.params.receiverId,
    isExistAlready: true,
  });

  try {
    const saveConversation = await newChat.save();

    res.status(201).json(saveConversation);
  } catch (err) {
    res.status(500).json(err);
  }
  }
  
};

module.exports.getChatByUserId = async (req, res) => {
  const myId = req.user.id;
  const fdId = req.params.receiverId;
  try {
    const chat = await Chat.find({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: myId,
              },
            },
            {
              receiverId: {
                $eq: fdId,
              },
            },
          ],
        },
        {
          $and: [
            {
              senderId: {
                $eq: fdId,
              },
            },
            {
              receiverId: {
                $eq: myId,
              },
            },
          ],
        },
      ],
    })
      .populate("receiverId", "-hash -salt")
      .populate("senderId", "-hash -salt")
      .populate("latestMessage");
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllconversations = async (req, res) => {
  const conversations = await Chat.find({})
    .populate("receiverId", "-hash -salt")
    .populate("senderId", "-hash -salt")
    .populate("latestMessage");
  try {
    console.log(conversations);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
