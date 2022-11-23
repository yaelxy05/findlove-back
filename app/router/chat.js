const router = require("express").Router();
const passport = require("passport");
// ----------
// Controller
// ----------
const chatController = require("../controllers/chatController");


// new conversation
router.post("/create/chat",passport.authenticate("jwt", { session: false }), chatController.createChat);

// get conversation of user
router.get("/chat/:userId",passport.authenticate("jwt", { session: false }), chatController.getChatByUserId)


module.exports = router;
