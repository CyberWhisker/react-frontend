import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App';
import LandingLayout from './layouts/landing';
import LandingPage from './pages/Landing/LandingPage';
import ProtectedRoute from './context/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthLayout from './layouts/auth';
import { AuthProvider } from './context/AuthContext';
import { ForgotPassword, Login, NotVerified, Register, ResetPassword, Verify } from './pages/Auth';
import { Dashboard, TechStack, Users, Projects, Experience } from './pages/Admin';
import { NotificationProvider } from './context/NotificationContext';
import Messenger from './pages/Messenger/Messenger';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: LandingLayout,
        children: [
          {
            path: '',
            Component: LandingPage,
          },
        ]
      },
      //Auth Routes
      {
        path: '/verify-email',
        Component: LandingLayout,
        children: [
          {
            path: '',
            Component: Verify,
          },
        ]
      },
      {
        path: '/notVerified',
        Component: LandingLayout,
        children: [
          {
            path: '',
            Component: NotVerified,
          },
        ]
      },
      {
        path: '/login',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: Login,
          },
        ]
      },
      {
        path: '/register',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: Register,
          },
        ]
      },
      {
        path: '/forgotPassword',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: ForgotPassword,
          },
        ]
      },
      {
        path: '/reset-password',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: ResetPassword,
          },
        ]
      },
      //Admin Routes
      {
        path: '/dashboard',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Dashboard
          },
        ]
      },
      {
        path: '/user',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Users,
          },
        ]
      },
      {
        path: '/projects',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Projects,
          },
        ]
      },
      {
        path: '/experience',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Experience,
          },
        ]
      },
      {
        path: '/techStack',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: TechStack,
          },
        ]
      },
      {
        path: '/messenger',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Messenger,
          },
          {
            path: ':id',
            Component: Messenger,
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1095160726391-43792gti1phme0ni89t8bdov9m1dfkgv.apps.googleusercontent.com">
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
