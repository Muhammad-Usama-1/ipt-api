const catchAsync = require("../utils/catchAsync");

exports.createMessage = catchAsync(async (req, res, next) => {
  //   const updatedUser = await User.findByIdAndUpdate();

  //   if (req.body.password || req.body.passwordConfirm) {
  //     return next(
  //       new AppError(
  //         "This route is not for password update.Please use updataMyPassword",
  //         400
  //       )
  //     );
  //   }
  res.status(200).json({
    status: "Success",
    data: {
      user: "Message created in DB",
    },
  });
  // Update user document
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  //   const updatedUser = await User.findByIdAndUpdate();

  res.status(200).json({
    status: "Success",
    data: {
      user: "All Messages from  DB",
    },
  });
  // Update user document
});
