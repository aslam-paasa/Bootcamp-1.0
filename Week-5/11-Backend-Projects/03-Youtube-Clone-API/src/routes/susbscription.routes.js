const express = require("express");
const verifyJWT = require("../middlewares/auth.middleware");
const {
  toggleSubscription,
  getChannelSubscribers,
  getUserSubscribedChannels,
} = require("../controllers/subscription.controller");

const subscriptionRouter = express.Router();
//Toggle subscription (subscribe/unsubscribe)
subscriptionRouter.post("/toggle/:channelId", verifyJWT, toggleSubscription);

// Get user's subscribed channels
subscriptionRouter.get("/user/channels", verifyJWT, getUserSubscribedChannels);

subscriptionRouter.get(
  "/user/:subscriberId/channels",
  verifyJWT,
  getUserSubscribedChannels
);

// Get channel subscribers
subscriptionRouter.get(
  "/channel/subscribers",
  verifyJWT,
  getChannelSubscribers
);

subscriptionRouter.get(
  "/channel/:channelId/subscribers",
  verifyJWT,
  getChannelSubscribers
);

module.exports = subscriptionRouter;
