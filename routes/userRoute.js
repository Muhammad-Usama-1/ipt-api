const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  logout,
  isLoggedIn,
  sendIsLoggedIn,
  getMyProfile,
} = require("../controllers/authController");
const {
  getAllUsers,
  createUser,

  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
  addToFriend,
  getFriendsRequest,
  getRecomendFriend,
  confirmAFriendRequest,
  getMyFriend,
  getFriendById,
  updateMeContact,
  getMyPhoto,
} = require("../controllers/userController");
const { restrictTo } = require("../controllers/authController");

const userRoute = express.Router();

userRoute.post("/sign-up", signup);
userRoute.post("/login", login);
userRoute.get("/logout", logout);
// For API (client side rendering)
userRoute.get("/isLoggedIn", isLoggedIn, sendIsLoggedIn);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.patch("/resetPassword/:token", resetPassword);

userRoute.use(protect);
userRoute.get("/my-profile", getMyProfile);
userRoute.get("/me", getMe, getUser);
userRoute.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
userRoute.patch("/updateMeContact", updateMeContact);
userRoute.get("/my-photo", getMyPhoto);

userRoute.delete("/deleteMe", deleteMe);
userRoute.patch("/updateMyPassword", updatePassword);
userRoute.post("/addFriend", addToFriend);
userRoute.get("/friendsRequest", getFriendsRequest);
userRoute.get("/friends", getMyFriend);
userRoute.get("/friend-by-id", getFriendById);

userRoute.post("/confirmFriendsRequest", confirmAFriendRequest);

// userRoute.use(restrictTo("admin"));

userRoute.route("/").get(getAllUsers).post(createUser);
userRoute.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRoute;
