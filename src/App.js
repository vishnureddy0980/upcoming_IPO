import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const PrivateRoute = ({ element }) => {
    return user ? (
      <Navigate to="/dashboard" replace />
    ) : (
      element
    );
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {user ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <div className="home-message">
                  <h2>Welcome to the Upcoming IPO App</h2>
                  <p>Please login or register to access the dashboard.</p>
                </div>
              )
            }
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<div>Dashboard Content</div>} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
