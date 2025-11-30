import React, { useEffect, useState } from "react";
import axios from "axios";
import Taskcard from "../components/Taskcard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const nav = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    if (!token) nav("/");
    fetchTasks();
  }, []);

  const createTask = async () => {
    await axios.post(
      "http://localhost:5000/api/tasks",
      { ...form },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Create Task</h3>
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button onClick={createTask}>Add Task</button>

      <h3>Your Tasks</h3>
      {tasks.map((t) => (
        <Taskcard key={t._id} task={t} refresh={fetchTasks} />
      ))}
    </div>
  );
}

export default Dashboard;
