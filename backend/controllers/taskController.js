// const mongoose = require("mongoose");
// const Task = require("../Models/taskModel");
import mongoose from "mongoose";
import Task from "../Models/taskModel.js";

// GET ALL TASKS:
const getTasks = async (request, response) => {
  const user_id = request.user._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
  response.status(200).json(tasks);
};

// GET A SINGLE TASK:
const getTask = async (request, response) => {
  const { id } = request.params;

  !mongoose.Types.ObjectId.isValid(id) &&
    response.status(404).json({ error: "No Such Task" });

  const task = await Task.findById(id);

  !task
    ? response.status(404).json({ error: "No Such Task" })
    : response.status(200).json(task);
};

// CREATE A NEW TASK & ADD DOCUMENT TO DATABASE:
const createTask = async (request, response) => {
  const { taskName } = request.body;
  const user_id = request.user._id;
  try {
    const task = await Task.create({ taskName, user_id });
    response.status(200).json(task);
  } catch (error) {
    response.status(400).json({ error: error });
  }
};

// DELETE A TASK:
const deleteTask = async (request, response) => {
  const { id } = request.params;

  !mongoose.Types.ObjectId.isValid(id) &&
    response.status(404).json({ error: "No Such Task" });

  const task = await Task.findByIdAndDelete({ _id: id });

  !task
    ? response.status(404).json({ error: "No Such Task" })
    : response.status(200).json(task);
};

// DELETE A TASK:
const updateTask = async (request, response) => {
  const { id } = request.params;

  !mongoose.Types.ObjectId.isValid(id) &&
    response.status(404).json({ error: "No Such Task" });

  Task.findById(id)
    .then((task) => {
      task.completed = !task.completed;
      return task.save();
    })
    .then((updatedTask) => {
      response.status(200).json(updatedTask);
    })
    .catch((error) => {
      response.status(404).json({ error: "No Such Task" });
    });
};

// DELETE COMPLETED TASKS:
const deleteCompletedTasks = async (request, response) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });

    const completedTaskIds = tasks
      .filter((task) => task.completed)
      .map((task) => task._id);

    const result = await Task.deleteMany({ _id: { $in: completedTaskIds } });

    response.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    response.status(400).json({ error: "No Completed Tasks Found" });
  }
};

export {
  getTask,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  deleteCompletedTasks,
};
