const { json } = require("express");
const asyncHandler = require("express-async-handler");
const Task = require("../modals/task.modal");
const ObjectId = require("mongoose").Types.ObjectId;

// getAll
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $unset: "user.password" },
    { $sort: { createdAt: -1 } },
  ]).exec();

  if (tasks) {
    res.status(200).send(tasks);
  } else {
    res.status(400);
    throw new Error("Failed to get tasks");
  }
});

// create
const createTask = asyncHandler(async (req, res) => {
  const newTask = await Task.create({
    ...req.body,
    user: req.user._id,
  });

  if (newTask) {
    res.status(201).json(newTask);
  } else {
    res.status(400);
    throw new Error("Failed to create task");
  }
});

// getOne
const getOneTask = asyncHandler(async (req, res) => {
  //   console.log(req.params.id);
  const response = await Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $unset: "user.password" },
    {
      $match: {
        _id: new ObjectId(req.params.id),
      },
    },
  ]).exec();

  const task = response[0];

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(400);
    throw new Error("Failed to get task");
  }
});

// update
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

// delete
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const deletedTask = await Task.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedTask);
});

module.exports = {
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
};
