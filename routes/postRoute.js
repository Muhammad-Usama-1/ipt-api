const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createUserPost,
  getAllUserPost,
  getAllFeed,
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
  .post(uploadUserPhoto, resizeUserPhoto, createUserPost)
  .get(getAllUserPost);
// , resizeUserPhoto, updateMe

module.exports = postRoute;
