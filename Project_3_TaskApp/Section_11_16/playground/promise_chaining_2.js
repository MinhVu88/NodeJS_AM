require('../src/db/mongoose_1');

const Task = require('../src/models/task');

Task.findByIdAndDelete('5ee1c8821e7fc50d64817627').then(() => {
    console.log('Task deletion accomplished');

    return Task.countDocuments({completed: false});
}).then(result => console.log(result)).catch(error => console.log(error));