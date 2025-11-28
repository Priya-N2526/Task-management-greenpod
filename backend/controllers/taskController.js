import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = req.user.role === "admin"
    ? await Task.find()
    : await Task.find({ userId: req.user.id });

  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    userId: req.user.id
  });
  await task.save();
  res.json({ message: "Task Created" });
};
