import React from 'react';
import { Navigate } from 'react-router-dom';

interface UnProtectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute: React.FC<UnProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  return !token ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default UnProtectedRoute;