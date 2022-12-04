const mongoose = require("mongoose");
const MsgSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  sender_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  reciver_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
const Message = mongoose.model("Message", MsgSchema);
module.exports = Message;
