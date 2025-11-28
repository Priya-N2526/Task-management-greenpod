import React, { useState } from 'react';
import API from '../services/api';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password, role });
      onRegister(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 20, borderRadius: 6 }}>
      <h3>Register</h3>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div>
        <label>Role: </label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
