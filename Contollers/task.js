const Task = require("../Models/task");
const asyncWrapper = require("../Middlewares/async");
const { createCustomError } = require("../Middlewares/customError");
//! Get All Tasks

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

//! Add Task

const addTask = asyncWrapper(async (req, res) => {
  const { name, age } = req.body;
  const tasks = await Task.create({
    name,
    age,
  });
  res.status(201).json({ tasks });
});

//! Get Single Task

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Task not found ,${taskId}`, 404));
  }
  res.status(200).json({ task });
});

//! Update Task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`Task not found ,${taskId}`, 404));
  }
  res.status(200).json({ task });
});

//! Delete Task

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`Task not found ,${taskId}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  addTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
