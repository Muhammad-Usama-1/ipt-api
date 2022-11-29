const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");

exports.createUserPost = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const user_id = req.user.id;
  const post = await Post.create({ ...req.body, user_id: req.user.id });
  //   res.send("post created");
  res.status(201).json({
    status: "Success",
    message: "Post succefully created",
    post,
  });
});

exports.getAllUserPost = catchAsync(async (req, res, next) => {
  //   res.send("post created");
  // const { text } = req.body;
  //   const user_id = req.user.id;
  const posts = await Post.find({ user_id: req.user.id });
  //   res.send("post created");
  res.status(201).json({
    status: "Success",
    // message: "Post succefully created",
    posts,
  });
});

exports.getAllFeed = catchAsync(async (req, res, next) => {
  //   res.send("post created");
  // const { text } = req.body;
  //   const user_id = req.user.id;
  const feeds = await Post.find();
  //   res.send("post created");
  res.status(201).json({
    status: "Success",
    // message: "Post succefully created",
    feeds,
  });
});
