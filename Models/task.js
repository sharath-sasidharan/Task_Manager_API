const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please provide the name`],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, `Please provide the age`],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
