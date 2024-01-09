import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { Center, Loader } from "@mantine/core"

export default function PrivateRoutes() {
  const { user, loadingInitial, isAuthenticated } = useAuth()

  if (loadingInitial && !user) {
    return (
      <Center h={"70vh"}>
        <Loader />
      </Center>
    )
  }

  if (!loadingInitial && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user && isAuthenticated) {
    return <Outlet />
  }

  return <Outlet />
}
