const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Description is Required"],
    trim: true,
  },
  photo: {
    type: String,
    // default: "default.jpg",
  },
  title: {
    type: String,
    // required: [true, "Title is Required"],
    trim: true,
  },
  hashtags: {
    type: String,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "User is required"],
  },
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
