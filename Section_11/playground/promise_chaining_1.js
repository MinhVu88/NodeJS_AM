require('../src/db/mongoose_0');

const User = require('../src/models/user');

User.findByIdAndUpdate('5eddbc5f7115040330e41ef2', {age: 38}).then(user => {
    console.log(user);

    return User.countDocuments({age: 38});
}).then(result => console.log(result)).catch(error => console.log(error));