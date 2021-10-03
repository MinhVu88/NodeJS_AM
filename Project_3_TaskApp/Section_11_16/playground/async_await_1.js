require('../src/db/mongoose_0');

const User = require('../src/models/user');

const updateAndCount = async(id, age) => {
    const updated_user = await User.findByIdAndUpdate(id, {age});

    const count = await User.countDocuments({age});

    return {updated_user, count};
};

updateAndCount('5eddbc5f7115040330e41ef5', 76).then(result => console.log(result)).catch(error => console.log(error));