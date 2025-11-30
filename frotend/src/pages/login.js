import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    localStorage.setItem("token", res.data.token);

    nav("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button>Login</button>
      </form>

      <button onClick={() => nav("/register")}>Go to Register</button>
    </div>
  );
}

export default Login;
