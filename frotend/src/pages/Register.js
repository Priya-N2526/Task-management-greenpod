import React, { useState } from "react";
import { API } from "../api";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "", role: "user" });

  const register = async () => {
    await API.post("/auth/register", data);
    alert("Registered!");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />

      <select onChange={(e) => setData({ ...data, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}
