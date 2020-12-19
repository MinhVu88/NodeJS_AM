const express = require("express"),
  router = new express.Router(),
  taskController = require("../controllers/taskController"),
  auth = require("../middleware/authentication");

// ROUTE HANDLERS FOR THE TASK MODEL
// router.post("/tasks", taskController.create);
router.post("/tasks", auth, taskController.create);

router.get("/tasks", auth, taskController.getAll);

router.get("/tasks/:id", auth, taskController.getOne);

router.patch("/tasks/:id", auth, taskController.update);

router.delete("/tasks/:id", auth, taskController.remove);

module.exports = router;
