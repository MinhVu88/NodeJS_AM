const mongoose = require("mongoose"),
  taskSchema = new mongoose.Schema(
    {
      description: { type: String, required: true, trim: true },

      completed: { type: Boolean, default: false },

      creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" }
    },
    { timestamps: true }
  ),
  Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
