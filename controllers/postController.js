const sharp = require("sharp");
const multer = require("multer");
const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image, Pleas eupload only image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadPostPhoto = upload.single("photo");
exports.resizePostPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/posts/${req.file.filename}`);
  next();
});
exports.createUserPost = catchAsync(async (req, res, next) => {
  const { text } = req.body;
  const user_id = req.user.id;
  console.log(req.body);
  if (req.file) req.body.photo = req.file.filename;
  const post = await Post.create({ ...req.body, user_id: req.user.id });

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
    data: posts,
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
    data: feeds,
  });
});
