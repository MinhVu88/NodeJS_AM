require("./db/mongoose_0");
require("./db/mongoose_1");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  user_router = require("./routers/user"),
  task_router = require("./routers/task");

// set up express's json middleware & routers
app.use(express.json());

app.use(user_router);

app.use(task_router);

app.listen(port, () => console.log(`Server is up on port ${port}`));
