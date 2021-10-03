require('../src/db/mongoose_1');

const Task = require('../src/models/task');

const deleteAndCount = async(id) => {
    const removed_task = await Task.findByIdAndDelete(id);

    const count = await Task.countDocuments({completed: false});

    return {removed_task, count};
};

deleteAndCount('5eddc87ae9ec923258a6e386').then(result => console.log(result)).catch(error => console.log(error));