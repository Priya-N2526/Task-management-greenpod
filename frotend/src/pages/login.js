import React, { useState } from 'react';
import API from '../services/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 20, borderRadius: 6 }}>
      <h3>Login</h3>
      <div>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
