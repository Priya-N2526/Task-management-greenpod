import React, { useEffect, useState } from "react";
import { API } from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.map((t) => (
        <div key={t._id}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <p>Due: {t.dueDate}</p>
          <p>Status: {t.status}</p>
        </div>
      ))}
    </div>
  );
}
