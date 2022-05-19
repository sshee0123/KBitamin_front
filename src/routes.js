import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
import MyMedi from './pages/MyMedi';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import DashboardApp from './pages/DashboardApp';
import Calendar from './pages/Calendar';
import MediInfo from './pages/MediInfo';
import DetailOneMediInfo from './pages/DetailOneMediInfo';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },,
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'profile', element: <Profile /> },
        { path: 'mediInfo', element: <MediInfo /> },
        { path: 'medicine/detailOneMediInfo', element: <DetailOneMediInfo/> },
        { path: 'myMedi', element: <MyMedi /> },
        { path: 'calendar', element: <Calendar /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
