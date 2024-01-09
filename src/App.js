// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import UpcomingIPOs from './components/UpcomingIPOs';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (userData) => {
    try {
      setUser(userData);
      // Redirect to the dashboard after successful login
      return <Navigate to="/dashboard" replace />;
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const PrivateRoute = ({ element }) => {
    return user ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: window.location.pathname }} replace />
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
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={
                  <>
                    <UpcomingIPOs />
                  </>
                }
              />
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <div className="home-message">
                  <h2>Welcome to the Stock Market App</h2>
                  <p>Please login or register to access the dashboard.</p>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
