const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  from_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a tour"],
  },
  to_user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must have a user"],
  },
  status: {
    type: String,
    default: "requested",
  },
});

const Friend = mongoose.model("Friend", FriendSchema);
module.exports = Friend;
