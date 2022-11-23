const router = require("express").Router();
const passport = require("passport");
// ----------
// Controller
// ----------
const messageController = require("../controllers/messageController");


// new message
router.post("/create/message/:chatId/:senderId",passport.authenticate("jwt", { session: false }), messageController.createMessage);

// get conversation of user
router.get("/message/:conversationId",passport.authenticate("jwt", { session: false }), messageController.getMessageByConversationId);

module.exports = router;
