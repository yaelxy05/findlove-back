const router = require("express").Router();
const { verifyToken } = require("../middlewares/authMiddleware.js");
// ----------
// Controller
// ----------
const {
  createChat,
  getChatByUserId,
  getAllconversations
} = require("../controllers/chatController");

// new conversation
router.post(
  "/create/chat/:receiverId",
  verifyToken,
  createChat
);

// get conversation of user
router.get(
  "/chat/:receiverId",
  verifyToken,
  getChatByUserId
);

// get conversations
router.get(
  "/chat-all",
  verifyToken,
  getAllconversations
);

module.exports = router;
