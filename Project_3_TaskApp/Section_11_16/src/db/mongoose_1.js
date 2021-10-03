const mongoose = require('mongoose'),
      conn_url = 'mongodb://127.0.0.1:27017/task_manager_mongoose';

mongoose.connect(conn_url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

// const task_0 = new Task({description: 'task 1', completed: true});
// task_0.save().then(task_model_instance => console.log(task_model_instance)).catch(error => console.log(error));

// const task_1 = new Task({description: '   task 2   '});
// task_1.save().then(task_model_instance => console.log(task_model_instance)).catch(error => console.log(error));

// // Error: description is required
// const task_2 = new Task({});
// task_2.save().then(task_model_instance => console.log(task_model_instance)).catch(error => console.log(error));