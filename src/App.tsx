import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import CreateUpdate from './pages/create-update';
import BookingView from './pages/booking-view';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Routes>
      {/* If the user is logged in, redirect them from the login page to home */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected Route (Home) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
        <Route
        path="/view-booking/:bookingId"
        element={
          <ProtectedRoute>
            <BookingView />
          </ProtectedRoute>
        }
      />
     <Route
        path="/create-booking"
        element={
          <ProtectedRoute>
            <CreateUpdate />
          </ProtectedRoute>
        }
      />

   <Route
        path="/update-booking/:bookingId"
        element={
          <ProtectedRoute>
            <CreateUpdate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
