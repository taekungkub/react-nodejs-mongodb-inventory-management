import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "./views/Login/index.tsx"
import RegisterPage from "./views/Register/index.tsx"
import DashboardLayout from "./layouts/DashboardLayout.tsx"
import ProfilePage from "./views/Profile/index.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import PrivateRoutes from "./middleware/PrivateRoutes.tsx"
import UnAuthRoutes from "./middleware/UnAuthRoutes.tsx"
import NotFoundPage from "./views/404/index.tsx"
import ShopPage from "./views/Shop/index.tsx"
import StockPage from "./views/Product/index.tsx"
import OrderPage from "./views/Order/index.tsx"
import DashboardPage from "./views/Dashboard/index.tsx"
import CategoryPage from "./views/Category/index.tsx"

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
                path: "/dashboard",
                element: <DashboardPage />,
              },
              {
                path: "/shop",
                element: <ShopPage />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
              {
                path: "/stock",
                element: <StockPage />,
              },
              {
                path: "/order",
                element: <OrderPage />,
              },
              {
                path: "/category",
                element: <CategoryPage />,
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
