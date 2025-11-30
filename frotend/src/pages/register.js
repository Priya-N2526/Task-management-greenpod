import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/register", data);
    localStorage.setItem("token", res.data.token);
    nav("/dashboard");
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />

        <select onChange={(e) => setData({ ...data, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
