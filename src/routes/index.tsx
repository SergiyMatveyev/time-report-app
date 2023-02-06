import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard';
import { Login } from '../pages/login';
import { Logout } from '../pages/logout';
import { TimeReport } from '../pages/timeReport';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/time-report" element={<TimeReport />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};
