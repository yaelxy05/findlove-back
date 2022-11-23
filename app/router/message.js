const router = require("express").Router();

// ----------
// Controller
// ----------
const messageController = require("../controllers/messageController");


// new message
router.post("/create/message/:chatId/:senderId", messageController.createMessage);

// get conversation of user
router.get("/message/:conversationId", messageController.getMessageByConversationId);

module.exports = router;
