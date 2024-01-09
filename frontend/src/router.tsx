import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "./features/Login/index.tsx"
import RegisterPage from "./features/Register/index.tsx"
import DashboardLayout from "./layouts/DashboardLayout.tsx"
import ProductPage from "./views/Product/index.tsx"
import ProfilePage from "./views/Profile/index.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import PrivateRoutes from "./middleware/PrivateRoutes.tsx"
import UnAuthRoutes from "./middleware/UnAuthRoutes.tsx"
import NotFoundPage from "./views/404/index.tsx"

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: "/",
        element: <Navigate to="/profile" replace={true} />,
      },
      {
        element: <UnAuthRoutes />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "/profile",
                element: <ProfilePage />,
              },
              {
                path: "/product",
                element: <ProductPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace={true} />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
])

export default router
