const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createMessage,
  getAllMessage,
} = require("../controllers/messageController");
const msgRoute = express.Router();
msgRoute.use(protect);
msgRoute.route("/").get(getAllMessage).post(createMessage);
module.exports = msgRoute;
