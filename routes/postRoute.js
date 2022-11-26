const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createUserPost,
  getAllUserPost,
} = require("../controllers/postController");
const postRoute = express.Router();

postRoute.use(protect);
postRoute.route("/").post(createUserPost).get(getAllUserPost);

module.exports = postRoute;
