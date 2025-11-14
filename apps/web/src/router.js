import { jsx as _jsx } from 'react/jsx-runtime';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import App from './App';
import PrototypeDashboard from './pages/PrototypeDashboard';
/**
 * Application routing configuration
 * Uses React Router v6 with data loading and error boundaries
 */
// Layout components (to be implemented)
const RootLayout = () => _jsx(Outlet, {});
const AuthLayout = () => _jsx(Outlet, {});
const DashboardLayout = () => _jsx(Outlet, {});
// Page components (to be implemented)
const HomePage = () => _jsx(App, {});
const LoginPage = () => _jsx('div', { children: 'Login Page' });
const SignUpPage = () => _jsx('div', { children: 'Sign Up Page' });
const TasksPage = () => _jsx('div', { children: 'Tasks' });
const CalendarPage = () => _jsx('div', { children: 'Calendar' });
const FocusPage = () => _jsx('div', { children: 'Focus Mode' });
const SettingsPage = () => _jsx('div', { children: 'Settings' });
const NotFoundPage = () => _jsx('div', { children: '404 - Page Not Found' });
/**
 * Router configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: _jsx(RootLayout, {}),
    errorElement: _jsx(NotFoundPage, {}),
    children: [
      {
        index: true,
        element: _jsx(HomePage, {}),
      },
      {
        path: 'auth',
        element: _jsx(AuthLayout, {}),
        children: [
          {
            path: 'login',
            element: _jsx(LoginPage, {}),
          },
          {
            path: 'signup',
            element: _jsx(SignUpPage, {}),
          },
          {
            path: 'callback',
            element: _jsx('div', { children: 'Processing authentication...' }),
          },
        ],
      },
      {
        path: 'app',
        element: _jsx(DashboardLayout, {}),
        children: [
          {
            index: true,
            element: _jsx(Navigate, { to: '/app/dashboard', replace: true }),
          },
          {
            path: 'dashboard',
            element: _jsx(PrototypeDashboard, {}),
          },
          {
            path: 'tasks',
            element: _jsx(TasksPage, {}),
          },
          {
            path: 'calendar',
            element: _jsx(CalendarPage, {}),
          },
          {
            path: 'focus',
            element: _jsx(FocusPage, {}),
          },
          {
            path: 'settings',
            element: _jsx(SettingsPage, {}),
          },
        ],
      },
    ],
  },
]);
/**
 * Route paths as constants for type safety
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  AUTH_CALLBACK: '/auth/callback',
  DASHBOARD: '/app/dashboard',
  TASKS: '/app/tasks',
  CALENDAR: '/app/calendar',
  FOCUS: '/app/focus',
  SETTINGS: '/app/settings',
};
//# sourceMappingURL=router.js.map
