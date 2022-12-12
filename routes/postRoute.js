const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createUserPost,
  getAllUserPost,
  getAllFeed,
  uploadPostPhoto,
  resizePostPhoto,
  getFriendPosts,
} = require("../controllers/postController");
const {
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/userController");
const postRoute = express.Router();

postRoute.use(protect);
postRoute.route("/feeds").get(getAllFeed);
postRoute
  .route("/")
  .post(uploadPostPhoto, resizePostPhoto, createUserPost)
  .get(getAllUserPost);
// , resizeUserPhoto, updateMe
postRoute.route("/:id").get(getFriendPosts);

module.exports = postRoute;
