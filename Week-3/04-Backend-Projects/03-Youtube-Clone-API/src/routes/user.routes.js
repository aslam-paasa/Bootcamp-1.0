const express = require("express");
const cookieParser = require("cookie-parser");

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateAccountDetails,
  updateAvatar,
  getUserChannelProfile,
  getWatchHistory,
  requestPasswordReset,
  resetPassword,
  updateCoverImage,
} = require("../controllers/user.controller");
const { upload } = require("../middlewares/multer.middleware");
const verifyJWT = require("../middlewares/auth.middleware");

const userRouter = express.Router();

//Public routes
userRouter.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

//Password reset routes
userRouter.post("/request-password-reset", requestPasswordReset);
userRouter.post("/reset-password", resetPassword);
//Private routes

//!Protected routes ()
userRouter.use(verifyJWT);
userRouter.post("/logout", logoutUser);
userRouter.get("/current-user", getCurrentUser);
userRouter.patch("/change-password", changePassword);
userRouter.patch("/update-account", updateAccountDetails);

//Avatar and cover image routes
userRouter.patch("/avatar", upload.single("avatar"), updateAvatar);
userRouter.patch("/cover-image", upload.single("coverImage"), updateCoverImage);

//Channel routes
userRouter.get("/c/:username", getUserChannelProfile);
userRouter.get("/history", getWatchHistory);

module.exports = userRouter;
