const router = require("express").Router();

// ----------
// Controller
// ----------
const chatController = require("../controllers/chatController");


// new conversation
router.post("/create/conversation", chatController.createChat);

// get conversation of user
router.get("/chat/:userId", chatController.getChatByUserId)


module.exports = router;
