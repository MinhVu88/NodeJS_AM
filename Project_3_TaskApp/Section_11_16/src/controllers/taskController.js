const mongoose = require("mongoose"),
  Task = require("../models/task");

async function create(request, response) {
  console.log(request.body);

  // const task = new Task(request.body);

  // task.save().then(() => response.status(201).send(task)).catch(error => response.status(400).send(error));

  // create an association between a newly created task & an auth user who created it
  const task = new Task({ ...request.body, creator: request.user._id });

  try {
    await task.save();

    response.status(201).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
}

/*
  * [ FILTERING TASKS ]: 
    - This can be implemented using "request.user.populate().execPopulate()"

    - 3 ways to fetch tasks: every task, all complete tasks or all incomplete tasks
        
    - The new url set up in Postman: {{url}}/tasks?completed=true
        
    - "request.query.completed" is "completed=true" & true is a string
        
    - However, "match.completed" must be of Boolean type
        
    - So, in the url, if 'completed' is assigned a value, that value needs to be converted to a boolean
        
    - The solution: request.query.completed === 'true' returns a boolean for match.completed

  * [ PAGINATION ]: GET /tasks?limit=an_int_value&skip=also_an_int_value

  * [ SORTING TASKS ]: GET /tasks?sortBy=createdAt_desc (ascencding: 1 | descending: -1)
*/
async function getAll(request, response) {
  // Task.find({}).then(tasks => response.status(200).send(tasks)).catch(error => response.status(500).send(error));

  try {
    // fetch tasks created by an authenticated user (approach #1)
    // const tasks = await Task.find({ creator: request.user._id });

    // response.status(200).send(tasks);

    // fetch tasks created by an authenticated user (approach #2)
    // await request.user.populate("virtual_tasks").execPopulate();

    const match = {},
      sort = {};

    if (request.query.completed) {
      console.log("request.query.completed:", typeof request.query.completed);

      match.completed = request.query.completed === "true";

      console.log("match.completed:", typeof match.completed);
    }

    if (request.query.sortBy) {
      const sortInfo = request.query.sortBy.split("_"),
        sortedBy = sortInfo[0],
        sortType = sortInfo[1];

      console.log(`sorted by: ${sortedBy} | sort type: ${sortType}`);

      sort[sortedBy] = sortType === "desc" ? -1 : 1;
    }

    await request.user
      .populate({
        path: "virtual_tasks",
        match,
        options: {
          limit: parseInt(request.query.limit),
          skip: parseInt(request.query.skip),
          sort
        }
      })
      .execPopulate();

    response.status(200).send(request.user.virtual_tasks);
  } catch (error) {
    response.status(500).send(error);
  }
}

async function getOne(request, response) {
  const _id = request.params.id;

  // Task.findById(_id).then(task => response.send(task)).catch(error => response.status(500).send(error));

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send(`${_id}: invalid/not found`);

    // const task = await Task.findById(_id);

    // find a task created by an authenticated user
    const task = await Task.findOne({ _id, creator: request.user._id });

    task === null ? response.status(404).send() : response.send(task);
  } catch (error) {
    response.status(500).send(error);
  }
}

async function update(request, response) {
  const valid_updates = ["description", "completed"];

  const uncharted_updates = Object.keys(request.body);

  const isValidUpdate = uncharted_updates.every(update => valid_updates.includes(update));

  if (!isValidUpdate) return response.status(400).send("invalid update");

  try {
    // const _id = request.params.id,
    //   task = await Task.findById(_id);

    // update a task created by an auth user
    const task = await Task.findOne({ _id: request.params.id, creator: request.user._id });

    if (!mongoose.Types.ObjectId.isValid(request.params.id) || task === null) return response.status(404).send(`${request.params.id}: invalid/not found`);

    uncharted_updates.forEach(update => (task[update] = request.body[update]));

    await task.save();

    // const updated_task = await Task.findByIdAndUpdate(_id, request.body, {new: true, runValidators: true});

    response.send(task);
  } catch (error) {
    response.status(400).send(error);
  }
}

async function remove(request, response) {
  try {
    // delete a task created by an auth user
    const _id = request.params.id,
      removed_task = await Task.findOneAndDelete({ _id, creator: request.user._id });

    if (!mongoose.Types.ObjectId.isValid(_id) || removed_task === null) return response.status(404).send(`${_id}: invalid/not found`);

    // const removed_task = await Task.findByIdAndDelete(_id);

    // if (!removed_task) return response.status(404).send();

    response.send(removed_task);
  } catch (error) {
    response.status(500).send(error);
  }
}

module.exports = { create, getAll, getOne, update, remove };
