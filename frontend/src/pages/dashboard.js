import React, { useEffect, useState } from "react";
import axios from "axios";
import Taskcard from "../components/taskcard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: "Bearer " + token },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    if (!token) navigate("/login");
    loadTasks();
  }, []);

  const createTask = async () => {
    await axios.post(
      "http://localhost:5000/api/tasks",
      {
        title,
        description: desc,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    setTitle("");
    setDesc("");
    loadTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />

        <input
          type="text"
          placeholder="Task description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        /><br /><br />

        <button onClick={createTask}>Create Task</button>
      </div>

      <hr />

      <h3>Your Tasks</h3>

      {tasks.map((t) => (
        <Taskcard key={t._id} task={t} refresh={loadTasks} />
      ))}
    </div>
  );
}

export default Dashboard;
