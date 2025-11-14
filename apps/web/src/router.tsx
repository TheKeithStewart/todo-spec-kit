import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';

/**
 * Application routing configuration
 * Uses React Router v6 with data loading and error boundaries
 */

// Layout components (to be implemented)
const RootLayout = () => <div>Root Layout</div>;
const AuthLayout = () => <div>Auth Layout</div>;
const DashboardLayout = () => <div>Dashboard Layout</div>;

// Page components (to be implemented)
const HomePage = () => <App />;
const LoginPage = () => <div>Login Page</div>;
const SignUpPage = () => <div>Sign Up Page</div>;
const DashboardPage = () => <div>Dashboard</div>;
const TasksPage = () => <div>Tasks</div>;
const CalendarPage = () => <div>Calendar</div>;
const FocusPage = () => <div>Focus Mode</div>;
const SettingsPage = () => <div>Settings</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

/**
 * Router configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
          {
            path: 'callback',
            element: <div>Processing authentication...</div>,
          },
        ],
      },
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/app/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'tasks',
            element: <TasksPage />,
          },
          {
            path: 'calendar',
            element: <CalendarPage />,
          },
          {
            path: 'focus',
            element: <FocusPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
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
} as const;
