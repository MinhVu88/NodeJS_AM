const mongoose = require("mongoose"),
  validator = require("validator"),
  bcryptjs = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  Task = require("./task"),
  userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },

      age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Age must not be negative");
        }
      },

      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) throw new Error("Invalid email");
        }
      },

      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
          if (value.toLowerCase().includes("password")) throw new Error("Invalid password");
        }
      },

      tokens: [
        {
          token: { type: String, required: true }
        }
      ]
    },
    { timestamps: true }
  ),
  secret = "areyouaoneorazero";

// STATICS -> THE MODEL ITSELF
// userSchema.statics: static methods are accessible on a model ( a.k.a model methods)
// a function that checks an user's credentials (email & password) to log them in
userSchema.statics.findByCredentials = async (email, password) => {
  // 1st check the email
  const user = await User.findOne({ email });

  if (!user) throw new Error("Unable to log in");

  // if the email were valid, then compare the passwords
  const samePassword = await bcryptjs.compare(password, user.password);

  if (!samePassword) throw new Error("Unable to login");

  return user;
};

// METHODS -> THE MODEL'S INSTANCES
// userSchema.methods: methods that are accessible on a model's instances (a.k.a instance methods)
// only an async non-arrow function is used, because of the 'this' binding in it
userSchema.methods.generateAuthToken = async function () {
  const user = this,
    token = jwt.sign({ _id: user._id.toString() }, secret);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

// hide an user's hashed password & auth tokens (approach #1: the manual way)
userSchema.methods.getPublicProfile = function () {
  const user = this,
    userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// hide an user's hashed password & auth tokens (approach #2: the auto way)
// 1st, in userController.js, when response.send() is called to send the user object back to the client
// JSON.stringify gets called internally by Express on user, which has toJSON as its property/method
// 2nd, toJSON is called by JSON.stringify automatically to manipulate the object
// within toJSON, toObject() turns user into a plain JS object (userObject) without the Mongoose metadata/methods
// the manipulation involves removing the object's password & tokens properties
userSchema.methods.toJSON = function () {
  const user = this,
    userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// VIRTUAL PROPERTY: not actual data stored in the db (no changes in the users document specifically) but just
// a way for mongoose to figure out the relationship between 2 entities/models (user & task)
userSchema.virtual("virtual_tasks", {
  ref: "Tasks",
  localField: "_id",
  foreignField: "creator"
});

// MIDDLEWARE
// set up the pre() middleware for hashing a plain-text password before an user's saved to the db
// the 2nd arg must be an async standard/regular function, not an arrow function, because of the 'this' binding in it
userSchema.pre("save", async function (next) {
  // this === the user doc that's about to be saved in the users collection
  const user = this;

  if (user.isModified("password")) user.password = await bcryptjs.hash(user.password, 8);

  // calling next() signifies that the middleware finishes its job before the user's saved
  next();
});

// using middleware to remove tasks created by a deleted user
userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ creator: user._id });

  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = { User, secret };
