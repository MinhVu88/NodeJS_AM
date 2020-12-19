require("../src/db/mongoose_1");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  task_router = require("../src/routers/task"),
  Task = require("../src/models/task"),
  user_router = require("../src/routers/user"),
  { User } = require("../src/models/user"),
  task_id = "5f1921ff531fa8191c3272e7",
  user_id = "5f191bb6224b661d94588b4f";

app.use(express.json());
app.use(task_router);
app.use(user_router);
app.listen(port, () => console.log(`[ Server is up on port ${port} ]`));

async function getUserByTask() {
  const task_metadata = await (await Task.findById(task_id).populate("creator")).execPopulate();

  return task_metadata;
}

getUserByTask()
  .then(data => console.log("-> Creator: ", data.creator))
  .catch(error => console.log(error));

async function getTaskByUser() {
  const user_metadata = await (await User.findById(user_id).populate("virtual_tasks")).execPopulate();

  return user_metadata;
}

getTaskByUser()
  .then(data => console.log(`-> Task(s) created by ${data.name}: ${data.virtual_tasks}`))
  .catch(error => console.log(error));
