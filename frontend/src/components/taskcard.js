import React from "react";
import axios from "axios";

function Taskcard({ task, refresh }) {
  const token = localStorage.getItem("token");

  const del = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    refresh();
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Status: {task.status}</small><br />
      <button onClick={del}>Delete</button>
    </div>
  );
}

export default Taskcard;
