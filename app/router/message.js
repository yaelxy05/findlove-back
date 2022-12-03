const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware.js");
// ----------
// Controller
// ----------
const messageController = require("../controllers/messageController");

// new message
router.post(
  "/create/message/:conversationId",
  verifyToken,
  messageController.createMessage
);

// get conversation of user
router.get(
  "/message/:conversationId",
  verifyToken,
  messageController.getMessageByConversationId
);

module.exports = router;
