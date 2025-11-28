import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URL } from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

mongoose.connect(MONGO_URL).then(() => {
  console.log("Mongo Connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
});
