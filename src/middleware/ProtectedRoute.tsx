import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('Necessário fazer o login antes.')
  }

  return token ? element : <Navigate to="/sign-in" replace />
}
