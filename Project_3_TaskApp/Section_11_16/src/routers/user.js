const express = require("express"),
	multer = require("multer"),
	router = new express.Router(),
	userController = require("../controllers/userController"),
	auth = require("../middleware/authentication"),
	upload = multer({
		limits: { fileSize: 1000000 },
		fileFilter(req, file, callback) {
			if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
				return callback(new Error("upload jpg/jpeg/png files only"));
			}

			callback(undefined, true);
		}
	});

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

// upload an auth/logged-in profile pic
router.post(
	"/users/me/img",
	auth,
	upload.single("image"),
	userController.uploadAuthProfilePic,
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

// delete an auth/logged-in profile pic
router.delete(
	"/users/me/img",
	auth,
	userController.removeUploadedProfilePic,
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

// get an user's profile pic by their id
router.get("/users/:id/img", userController.getAuthProfilePic, (error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

module.exports = router;
