const express = require("express"),
  router = new express.Router(),
  userController = require("../controllers/userController"),
  auth = require("../middleware/authentication");

// ROUTE HANDLERS FOR THE USER MODEL
// create a new user in the users collection (the sign-up process)
router.post("/users", userController.create);

// for an existing user to log in
router.post("/users/login", userController.login);

// for an auth/logged-in user to log out
router.post("/users/logout", auth, userController.logout);

// for an auth/logged-in user to log out of all sessions/devices user's currently logged in
router.post("/users/logout-all", auth, userController.logoutAll);

// get all users
// router.get("/users", auth, userController.getMany);

// get an auth/logged-in user profile
router.get("/users/me", auth, userController.getAuthProfile);

// get a single user (deprecated)
// router.get("/users/:id", userController.getOne);

// update an auth/logged-in user
// router.patch("/users/:id", userController.update);
router.patch("/users/me", auth, userController.update);

// delete an auth/logged-in user
// router.delete("/users/:id", userController.remove);
router.delete("/users/me", auth, userController.remove);

module.exports = router;
