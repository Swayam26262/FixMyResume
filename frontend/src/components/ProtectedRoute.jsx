import React from 'react';
import authService from '../services/authService';

export default function ProtectedRoute({ children, onNavigate }) {
  const user = authService.getCurrentUser();

  if (!user) {
    onNavigate('login');
    return null;
  }

  return children;
} 