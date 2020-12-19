const mongoose = require("mongoose"),
  { User } = require("../models/user");

async function create(request, response) {
  console.log(request.body);

  const user = new User(request.body);

  // user.save().then(() => response.status(201).send(user)).catch(error => response.status(400).send(error));

  try {
    await user.save();

    const token = await user.generateAuthToken();

    response.status(201).send({ user, token });
  } catch (error) {
    response.status(400).send(error);
  }
}

async function login(request, response) {
  try {
    const user = await User.findByCredentials(request.body.email, request.body.password),
      token = await user.generateAuthToken();

    // hide an user's hashed password & auth tokens (approach #1: the manual way)
    // response.send({ user: user.getPublicProfile(), token });

    // hide an user's hashed password & auth tokens (approach #2: the auto way)
    response.send({ user, token });
  } catch (error) {
    response.status(400).send(error);
  }
}

async function logout(request, response) {
  try {
    request.user.tokens = request.user.tokens.filter(token => token.token !== request.token);

    await request.user.save();

    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
}

async function logoutAll(request, response) {
  try {
    request.user.tokens = [];

    await request.user.save();

    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
}

// async function getMany(request, response) {
//     try {
//       const users = await User.find({});

//       response.status(200).send(users);
//     } catch (error) {
//       response.status(500).send(error);
//     }
// }

async function getAuthProfile(request, response) {
  response.send(request.user);
}

// (deprecated)
// async function getOne(request, response) {
//   console.log(request.params, "|", request.params.id);

//   const _id = request.params.id;

//   // User.findById(_id).then(user => response.send(user)).catch(error => response.status(500).send(error));

//   try {
//     if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send(`${_id}: invalid/not found`); // vid #91

//     const user = await User.findById(_id);

//     response.send(user);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// }

async function update(request, response) {
  const valid_updates = ["name", "age", "email", "password"],
    uncharted_updates = Object.keys(request.body),
    isValidUpdate = uncharted_updates.every(update => valid_updates.includes(update));

  if (!isValidUpdate) return response.status(400).send("invalid update");

  try {
    // const _id = request.params.id,
    //   user = await User.findById(_id);

    const user = request.user;

    uncharted_updates.forEach(update => (user[update] = request.body[update]));

    await user.save();

    // if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send(`${_id}: invalid/not found`);

    // findByIdAndUpdate() bypasses the pre() middleware defined in the user model, so it's no longer used
    // instead the code in the try block was modified for save() to be used & save() doesn't ignore pre()
    // const updated_user = await User.findByIdAndUpdate(_id, request.body, {new: true, runValidators: true});

    response.send(user);
  } catch (error) {
    response.status(400).send(error);
  }
}

async function remove(request, response) {
  try {
    // const _id = request.params.id;
    const user = request.user;

    // if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send(`${_id}: invalid/not found`);

    // const removed_user = await User.findByIdAndDelete(_id);

    // if (!removed_user) return response.status(404).send();

    await user.remove();

    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
}

module.exports = { create, login, logout, logoutAll, getAuthProfile, update, remove };
