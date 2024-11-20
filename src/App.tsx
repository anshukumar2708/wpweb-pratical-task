import React  from 'react';
import { Routes, Route, Navigate, } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import CreateUpdate from './pages/create-update';
import BookingView from './pages/booking-view';
import UnProtectedRoute from './components/unProtectRoute';

const App: React.FC = () => {
  // const [token, setToken] = useState<string>('');

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('authToken');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <UnProtectedRoute>
             <Login />
           </UnProtectedRoute>
          }
      />

      <Route
        path="/login"
        element={
          <UnProtectedRoute>
              <Navigate to="/login" replace />
           </UnProtectedRoute>
          }
      />

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
      
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Navigate to="/" replace />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;
