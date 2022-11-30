const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  from_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Friend Model must have id  from its requested"],
  },
  to_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Friend Model must have id  to  its requested"],
  },
  status: {
    type: String,
    default: "requested",
  },
});

const Friend = mongoose.model("Friend", FriendSchema);
module.exports = Friend;
