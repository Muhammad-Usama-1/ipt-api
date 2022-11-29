const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createUserPost,
  getAllUserPost,
  getAllFeed,
} = require("../controllers/postController");
const postRoute = express.Router();

postRoute.use(protect);
postRoute.route("/feeds").get(getAllFeed);
postRoute.route("/").post(createUserPost).get(getAllUserPost);

module.exports = postRoute;
