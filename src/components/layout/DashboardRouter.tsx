import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import UserDashboard from '@/pages/userDashboard/UserDashboard';
import AdminDashboard from '@/pages/adminDashboard/AdminDashboard';

const DashboardRouter: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  switch (user.userRole) {
    case 'user':
      return <UserDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default DashboardRouter;