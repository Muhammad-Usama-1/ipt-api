const multer = require("multer");
const sharp = require("sharp");
const Friend = require("../models/FriendModel");
const User = require("../models/userModel");
// const APIFeatures = require('../utils/apiFeatures');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

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
exports.uploadUserPhoto = upload.single("photo");
// exports.uploadPostPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // create an error if user post password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update.Please use updataMyPassword",
        400
      )
    );
  }
  // filtered out unwanted fields
  const filterBody = filterObj(
    req.body,
    "name",
    "email",
    "address",
    "city",
    "gender",
    "dob"
  );
  if (req.file) filterBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "Success",
    data: {
      user: updatedUser,
    },
  });
  // Update user document
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not  defined! Please use sign up instead",
  });
};

exports.addToFriend = catchAsync(async (req, res, next) => {
  // await User.findByIdAndUpdate(req.user.id, { active: false });
  if (!req.body.to_user) {
    return next(
      new AppError(
        "Please provide id of the user , that your are sending request to",
        400
      )
    );
  }

  const newFriendReq = await Friend.create({
    from_user: req.user.id,
    to_user: req.body.to_user,
  });

  res.status(201).json({
    status: "Success",
    data: newFriendReq,
  });
});
exports.getFriendsRequest = catchAsync(async (req, res, next) => {
  const friendReqs = await Friend.find({
    to_user: req.user.id,
    status: "requested",
  }).populate("from_user");

  res.status(200).json({
    status: "Success",
    data: { data: friendReqs },
  });
});
exports.confirmAFriendRequest = catchAsync(async (req, res, next) => {
  const friendReqs = await Friend.findByIdAndUpdate(
    req.body.id,
    { status: "accepted" },
    { new: true }
  );
  console.log(friendReqs);

  res.status(200).json({
    status: "Success",
    data: "Updated",
  });
});
exports.getMyFriend = catchAsync(async (req, res, next) => {
  const friends = await Friend.find({
    $or: [{ from_user: req.user.id }, { to_user: req.user.id }],
    status: "accepted",
  })
    .populate("to_user")
    .populate("from_user");

  res.status(200).json({
    status: "Success",
    data: friends,
  });
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Get all users without loged in
  const allUsers = await User.find({ _id: { $ne: req.user.id } });

  res.status(200).json({
    status: "Success",
    data: allUsers,
  });
});
exports.getFriendById = catchAsync(async (req, res, next) => {
  // Get all users without loged in
  if (req.params.id) {
    return next(new AppError("Please provide of the friend in params", 400));
  }
  const friends = await Friend.find({
    $or: [{ from_user: req.params.id }, { to_user: req.params.id }],
    status: "accepted",
  })
    .populate("to_user")
    .populate("from_user");

  res.status(200).json({
    status: "Success",
    data: friends,
  });
});

exports.getUser = factory.getOne(User);
// exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
