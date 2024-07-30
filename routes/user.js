const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/api/v1/userController");

// Unauthenticated routes
router.post("/signup", userController.userSignup);
router.post("/login", userController.login);

// Authenticated routes
router.use("/loan", passport.authenticate("jwt", { session: false }), require("./loan"));

router.get(
  "/listUsers",
  passport.authenticate("jwt", { session: false }),
  userController.listUsers
);

router.get(
  "/agentRequestList",
  passport.authenticate("jwt", { session: false }),
  userController.agentRequestList
);

router.post(
  "/approveAgent",
  passport.authenticate("jwt", { session: false }),
  userController.approveAgent
);

router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  userController.updatePassword
);

// Profile route
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.profile
);

module.exports = router;
