const { createConversation } = require("../controllers/chat_controllers/create_conversation");
const { search } = require("../controllers/chat_controllers/search_contoller");
const { sendMessage } = require("../controllers/chat_controllers/send_message");
const { createOrder } = require("../controllers/create_order");

const router = require("express").Router() ; 

router.post("/createConversation" , createConversation)

router.post("/sendMessage" , sendMessage) 


router.post("/search" , search) 



router.post("/order" , createOrder)

module.exports = router