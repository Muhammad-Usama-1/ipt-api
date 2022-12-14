const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  like: {
    type: Boolean,
  },
});
const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
