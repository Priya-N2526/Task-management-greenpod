import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  status: { type: String, default: "Pending" },
  userId: String
});

export default mongoose.model("Task", taskSchema);
