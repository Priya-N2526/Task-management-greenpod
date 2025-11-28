import React, { useState, useEffect } from 'react';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { setAuthToken } from './services/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  function handleLogin(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setAuthToken(null);
  }

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Task App</h2>
        <div style={{ display: 'flex', gap: 20 }}>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleLogin} />
        </div>
      </div>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
